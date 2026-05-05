import {FC, useCallback, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import FormInput from '@components/FormInput/FormInput';
import FormTextarea from '@components/FormTextarea/FormTextarea';
import Button from '@components/Button/Button';
import GoalBanner from '@components/GoalBanner/GoalBanner';
import LetterPreview from '@pages/GeneratorPage/components/LetterPreview/LetterPreview';
import {useApplications} from '@context/applications/useApplications';
import {useClipboard} from '@hooks/useClipboard';
import {generateLetter} from '@pages/GeneratorPage/helpers/generate-letter.ts';
import './GeneratorPage.css';
import {GeneratorState} from '@models/enums/generator-state.enum.ts';
import classNames from 'classnames';

const MAX_CHARS = 1200;

interface IForm {
    jobTitle: string;
    company: string;
    skills: string;
    additionalDetails: string;
}

interface IGeneratorState {
    state: GeneratorState;
    value?: string;
}

const defaultGeneratorState: IGeneratorState = {
    state: GeneratorState.IDLE,
    value: 'Your personalized job application will appear here...',
};

const GeneratorPage: FC = () => {
    const {addApplication, deleteApplication, applications, goal, goalReached} = useApplications();
    const {copy} = useClipboard();

    const [generatorState, setGeneratorState] = useState<IGeneratorState>(defaultGeneratorState);
    const lastSavedApplicationIdRef = useRef<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: {isValid, errors},
    } = useForm<IForm>({
        defaultValues: {jobTitle: '', company: '', skills: '', additionalDetails: ''},
        mode: 'onChange',
    });

    const [jobTitle, company, additionalDetails] = watch(['jobTitle', 'company', 'additionalDetails']);

    const isCompleted = generatorState.state === GeneratorState.COMPLETED;
    const isGenerating = generatorState.state === GeneratorState.GENERATING;

    const pageTitle = jobTitle && company ? `${jobTitle}, ${company}` : jobTitle || company || 'New application';

    const onSubmit = async (data: IForm) => {
        setGeneratorState({state: GeneratorState.GENERATING});

        try {
            const letter = await generateLetter(data);
            const id = crypto.randomUUID();
            lastSavedApplicationIdRef.current = id;
            addApplication({...data, id, generatedLetter: letter});
            setGeneratorState({state: GeneratorState.COMPLETED, value: letter});
        } catch {
            setGeneratorState({state: GeneratorState.ERROR, value: 'Something went wrong. Please try again.'});
        }
    };

    const handleTryAgain = () => {
        if (!lastSavedApplicationIdRef.current) return;
        deleteApplication(lastSavedApplicationIdRef.current);
        lastSavedApplicationIdRef.current = null;
        reset();
        setGeneratorState(defaultGeneratorState);
    };

    const handleCopy = useCallback(() => {
        generatorState?.value && copy(generatorState.value);
    }, [copy, generatorState]);

    return (
        <div className='generator-page'>
            <div className='generator-layout'>
                <div>
                    <h1
                        className={classNames(
                            'generator-title',
                            !jobTitle && !company && 'generator-title--placeholder',
                            'mb-3',
                        )}>
                        {pageTitle}
                    </h1>
                    <div className='generator-divider' />

                    <form onSubmit={handleSubmit(onSubmit)} className='generator-form'>
                        <div className='generator-form-row'>
                            <FormInput
                                label='Job title'
                                placeholder='Product manager'
                                disabled={isGenerating}
                                hasError={!!errors.jobTitle}
                                required
                                {...register('jobTitle', {required: true})}
                            />
                            <FormInput
                                label='Company'
                                placeholder='Apple'
                                disabled={isGenerating}
                                hasError={!!errors.company}
                                required
                                {...register('company', {required: true})}
                            />
                        </div>

                        <FormInput
                            label='I am good at...'
                            placeholder='HTML, CSS and doing things in time'
                            disabled={isGenerating}
                            {...register('skills')}
                        />

                        <FormTextarea
                            label='Additional details'
                            placeholder='Describe why you are a great fit or paste your bio'
                            rows={8}
                            maxLength={MAX_CHARS}
                            currentLength={additionalDetails.length}
                            disabled={isGenerating}
                            hasError={!!errors.additionalDetails}
                            {...register('additionalDetails', {maxLength: MAX_CHARS})}
                        />

                        {isCompleted ? (
                            <Button
                                type='button'
                                variant='secondary'
                                startIcon='icon-refresh'
                                fullWidth
                                className='my-4 h-14 text-fg-secondary'
                                onClick={handleTryAgain}>
                                Try Again
                            </Button>
                        ) : (
                            <Button
                                type='submit'
                                fullWidth
                                className='my-4 h-14'
                                loading={isGenerating}
                                disabled={!isValid}>
                                Generate Now
                            </Button>
                        )}
                    </form>
                </div>

                <div className='generator-preview-col'>
                    <LetterPreview
                        value={generatorState?.value || ''}
                        state={generatorState.state}
                        onCopy={handleCopy}
                    />
                </div>
            </div>

            {isCompleted && !goalReached && (
                <div className='generator-goal'>
                    <GoalBanner current={applications.length} total={goal} onCreateNew={handleTryAgain} />
                </div>
            )}
        </div>
    );
};

export default GeneratorPage;
