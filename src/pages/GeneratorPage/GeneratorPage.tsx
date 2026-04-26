import {FC, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import IconButton from '@components/IconButton/IconButton';
import FormInput from '@components/FormInput/FormInput';
import FormTextarea from '@components/FormTextarea/FormTextarea';
import Button from '@components/Button/Button';
import GoalBanner from '@components/GoalBanner/GoalBanner';
import LetterPreview from '@pages/GeneratorPage/components/LetterPreview/LetterPreview';
import {useApplications} from '@context/applications/useApplications';
import {useClipboard} from '@hooks/useClipboard';
import {cn} from '@utils/cn.ts';
import {GeneratorState} from '@models/enums/generator-state.enum';
import {GeneratorStatus} from '@pages/GeneratorPage/types/generator.types.ts';
import {generateLetter} from '@pages/GeneratorPage/helpers/generate-letter.ts';

const MAX_CHARS = 1200;

interface IForm {
    jobTitle: string;
    company: string;
    skills: string;
    additionalDetails: string;
}

const GeneratorPage: FC = () => {
    const {addApplication, applications, goal, goalReached} = useApplications();
    const {copy, copied} = useClipboard();

    const [status, setStatus] = useState<GeneratorStatus>({phase: GeneratorState.IDLE});
    const isMountedRef = useRef(true);

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

    const isCompleted = status.phase === GeneratorState.COMPLETED || status.phase === GeneratorState.ERROR;
    const isGenerating = status.phase === GeneratorState.GENERATING;

    const pageTitle = jobTitle && company ? `${jobTitle}, ${company}` : jobTitle || company || 'New application';

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const onSubmit = async (data: IForm) => {
        setStatus({phase: GeneratorState.GENERATING});

        try {
            const letter = await generateLetter(data);

            if (!isMountedRef.current) return;

            addApplication({...data, generatedLetter: letter});
            setStatus({phase: GeneratorState.COMPLETED, letter});
            reset();
        } catch {
            if (!isMountedRef.current) return;
            setStatus({phase: GeneratorState.ERROR, message: 'Something went wrong. Please try again.'});
        }
    };

    const handleTryAgain = () => setStatus({phase: GeneratorState.IDLE});

    return (
        <div className='mx-auto w-full max-w-5xl px-4 py-8 md:px-8'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                <div>
                    <h1 className='mb-6 font-display text-3xl font-bold text-fg-primary md:text-4xl'>{pageTitle}</h1>
                    <div className='mb-1 h-px w-full bg-stroke' />

                    <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col gap-5'>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <FormInput
                                label='Job title'
                                placeholder='Product manager'
                                disabled={isGenerating}
                                hasError={!!errors.jobTitle}
                                errorMessage='Job title is required'
                                required
                                {...register('jobTitle', {required: true})}
                            />
                            <FormInput
                                label='Company'
                                placeholder='Apple'
                                disabled={isGenerating}
                                hasError={!!errors.company}
                                errorMessage='Company is required'
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
                            errorMessage={`Maximum ${MAX_CHARS} characters`}
                            {...register('additionalDetails', {maxLength: MAX_CHARS})}
                        />

                        {isCompleted ? (
                            <Button
                                type='button'
                                variant='secondary'
                                icon='icon-refresh'
                                fullWidth
                                onClick={handleTryAgain}
                                className='gap-2'>
                                Try Again
                            </Button>
                        ) : (
                            <Button type='submit' fullWidth loading={isGenerating} disabled={!isValid}>
                                Generate Now
                            </Button>
                        )}
                    </form>
                </div>

                <div className='flex flex-col gap-3'>
                    <div className='flex flex-1 flex-col rounded-2xl bg-surface p-6 min-h-64'>
                        <LetterPreview status={status} />
                    </div>
                    <IconButton
                        icon={copied ? 'icon-check' : 'icon-copy'}
                        label={copied ? 'Copied!' : 'Copy to clipboard'}
                        onClick={() => status.phase === GeneratorState.COMPLETED && copy(status.letter)}
                        disabled={!isCompleted}
                        className={cn(
                            'self-end',
                            isCompleted
                                ? 'text-fg-secondary hover:text-fg-primary'
                                : 'cursor-not-allowed text-fg-muted',
                            copied && 'text-brand',
                        )}
                    />
                </div>
            </div>

            {isCompleted && !goalReached && (
                <div className='mt-8'>
                    <GoalBanner current={applications.length} total={goal} onCreateNew={handleTryAgain} />
                </div>
            )}
        </div>
    );
};

export default GeneratorPage;
