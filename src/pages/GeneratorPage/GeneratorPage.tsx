import {type ChangeEvent, FC, useCallback, useEffect, useRef, useState} from 'react';
import {RefreshCw, Copy, Check} from 'lucide-react';
import {cn} from '@utils/cn';
import {FormInput} from '@components/FormInput';
import {FormTextarea} from '@components/FormTextarea';
import {Button} from '@components/Button';
import {GoalBanner} from '@components/GoalBanner';
import {Spinner} from '@components/Spinner';
import {useApplications} from '@hooks/useApplications';
import {useClipboard} from '@hooks/useClipboard';
import {generateLetterWithDelay} from '@utils/generateLetter';
import {GeneratorState} from '@models/enums/generator-state.enum';

const MAX_CHARS = 1200;

interface FormValues {
    jobTitle: string;
    company: string;
    skills: string;
    additionalDetails: string;
}

const EMPTY_FORM: FormValues = {
    jobTitle: '',
    company: '',
    skills: '',
    additionalDetails: '',
};

const GeneratorPage: FC = () => {
    const {addApplication, applications, goal, goalReached} = useApplications();
    const {copy, copied} = useClipboard();

    const [form, setForm] = useState<FormValues>(EMPTY_FORM);
    const [state, setState] = useState<GeneratorState>(GeneratorState.IDLE);
    const [generatedLetter, setGeneratedLetter] = useState('');
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const isOverLimit = form.additionalDetails.length > MAX_CHARS;
    const hasRequiredFields = form.jobTitle.trim() !== '' && form.company.trim() !== '';
    const canGenerate = hasRequiredFields && !isOverLimit;
    const isCompleted = state === GeneratorState.COMPLETED;
    const isGenerating = state === GeneratorState.GENERATING;

    const pageTitle =
        form.jobTitle || form.company
            ? [form.jobTitle, form.company].filter(Boolean).join(', ')
            : 'New application';

    const handleFieldChange = useCallback(
        (field: keyof FormValues) =>
            (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setForm((prev) => ({...prev, [field]: e.target.value})),
        [],
    );

    const handleGenerate = useCallback(async () => {
        if (!canGenerate) return;

        setState(GeneratorState.GENERATING);

        const letter = await generateLetterWithDelay(form.jobTitle, form.company, form.skills, form.additionalDetails);

        if (!isMountedRef.current) return;

        addApplication({
            jobTitle: form.jobTitle,
            company: form.company,
            skills: form.skills,
            additionalDetails: form.additionalDetails,
            generatedLetter: letter,
        });

        setGeneratedLetter(letter);
        setState(GeneratorState.COMPLETED);
        // canGenerate is intentionally excluded — it's fully derived from `form`
    }, [form, addApplication]);

    const handleTryAgain = useCallback(() => {
        setState(GeneratorState.IDLE);
        setGeneratedLetter('');
        setForm(EMPTY_FORM);
    }, []);

    return (
        <div className='mx-auto w-full max-w-5xl px-4 py-8 md:px-8'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                {/* Left: Form */}
                <div>
                    <h1 className='mb-6 font-display text-3xl font-bold text-ink md:text-4xl'>{pageTitle}</h1>
                    <div className='mb-1 h-px w-full bg-surface-border' />

                    <div className='mt-6 flex flex-col gap-5'>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                            <FormInput
                                label='Job title'
                                value={form.jobTitle}
                                onChange={handleFieldChange('jobTitle')}
                                placeholder='Product manager'
                                disabled={isGenerating}
                            />
                            <FormInput
                                label='Company'
                                value={form.company}
                                onChange={handleFieldChange('company')}
                                placeholder='Apple'
                                disabled={isGenerating}
                            />
                        </div>

                        <FormInput
                            label='I am good at...'
                            value={form.skills}
                            onChange={handleFieldChange('skills')}
                            placeholder='HTML, CSS and doing things in time'
                            disabled={isGenerating}
                        />

                        <FormTextarea
                            label='Additional details'
                            value={form.additionalDetails}
                            onChange={handleFieldChange('additionalDetails')}
                            placeholder='Describe why you are a great fit or paste your bio'
                            rows={8}
                            maxChars={MAX_CHARS}
                            currentLength={form.additionalDetails.length}
                            disabled={isGenerating}
                        />

                        {isCompleted ? (
                            <Button variant='secondary' fullWidth onClick={handleTryAgain} className='gap-2'>
                                <RefreshCw size={16} />
                                Try Again
                            </Button>
                        ) : (
                            <Button fullWidth loading={isGenerating} disabled={!canGenerate} onClick={handleGenerate}>
                                Generate Now
                            </Button>
                        )}
                    </div>
                </div>

                {/* Right: Letter panel */}
                <div className='flex flex-col gap-3'>
                    <div className='flex flex-1 flex-col rounded-2xl bg-surface-secondary p-6 min-h-64'>
                        {isCompleted ? (
                            <p className='font-text text-sm leading-relaxed text-ink-secondary whitespace-pre-line'>
                                {generatedLetter}
                            </p>
                        ) : isGenerating ? (
                            <div className='flex flex-1 items-center justify-center'>
                                <Spinner size={36} className='text-ink-tertiary' />
                            </div>
                        ) : (
                            <p className='font-text text-sm text-ink-tertiary'>
                                Your personalized job application will appear here...
                            </p>
                        )}
                    </div>
                    <button
                        type='button'
                        onClick={() => copy(generatedLetter)}
                        disabled={!isCompleted}
                        className={cn(
                            'self-end inline-flex items-center gap-1.5 font-text text-sm transition-colors duration-150 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green',
                            isCompleted
                                ? 'text-ink-secondary hover:text-ink'
                                : 'cursor-not-allowed text-ink-tertiary',
                        )}>
                        {copied ? <Check size={14} className='text-brand-green' /> : <Copy size={14} />}
                        {copied ? 'Copied!' : 'Copy to clipboard'}
                    </button>
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
