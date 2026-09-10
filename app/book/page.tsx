'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { type FormEvent, type ReactNode, Suspense, useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, Mail, MessageCircle, Send } from 'lucide-react';

const standardDurationOptions = ['1-2 mins', '3-5 mins', '10+ mins', 'Custom'];
const documentaryDurationOptions = ['5 mins', '10 mins', '15 mins', 'Custom'];
const customOrderDurationOptions = ['5 mins', '10 mins', '15 mins', 'Custom'];
const videoTypeOptions = ['Documentary Video', 'Shorts', 'Map Animation', 'Type your category'];
const shortsDurationOptions = ['1 min', '2 min', 'Custom'];
const shortsPrices: Record<string, string> = {
  '1 min': '$10 USD',
  '2 min': '$20 USD',
  Custom: 'Price will be discussed in chat',
};
const documentaryPrices: Record<string, string> = {
  '5 mins': '$70 USD',
  '10 mins': '$110 USD',
  '15 mins': '$160 USD',
  Custom: 'Price will be discussed in chat',
};
type ChoiceCardProps = {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
};

function ChoiceCard({ active, children, onClick }: ChoiceCardProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17171d] focus-visible:ring-offset-2 ${
        active
          ? 'border-[#17171d] bg-[#17171d] text-white shadow-[0_8px_20px_rgba(23,23,29,0.16)]'
          : 'border-[#d9dbe0] bg-white text-[#34343a] hover:border-[#17171d] hover:bg-[#fafafb]'
      }`}
    >
      {children}
    </button>
  );
}

function BookingForm() {
  const searchParams = useSearchParams();
  const packageName = searchParams.get('package')?.trim() || 'Custom Order';
  const isDocumentary = packageName === 'Documentary Edit';
  const isShorts = packageName === 'Shorts & Reels';
  const isCustomOrder = packageName === 'Custom Order';
  const [videoType, setVideoType] = useState('Documentary Video');
  const [customVideoType, setCustomVideoType] = useState('');
  const isShortsVideo = isShorts || (isCustomOrder && videoType === 'Shorts');
  const availableDurationOptions = isDocumentary
    ? documentaryDurationOptions
    : isShortsVideo
      ? shortsDurationOptions
      : isCustomOrder
        ? customOrderDurationOptions
        : standardDurationOptions;
  const defaultDuration = isShortsVideo ? '1 min' : isDocumentary || isCustomOrder ? '5 mins' : '1-2 mins';
  const [communication, setCommunication] = useState<'WhatsApp' | 'Email'>('WhatsApp');
  const [duration, setDuration] = useState(defaultDuration);
  const [customDuration, setCustomDuration] = useState('');
  const [customDelivery, setCustomDelivery] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    setDuration(defaultDuration);
    setCustomDuration('');
  }, [defaultDuration]);

  useEffect(() => {
    setVideoType('Documentary Video');
    setCustomVideoType('');
    setCustomDelivery('');
  }, [packageName]);

  const selectedDuration = duration === 'Custom' ? customDuration.trim() || 'Custom' : duration;
  const selectedVideoType = videoType === 'Type your category' ? customVideoType.trim() || 'Custom category' : videoType;
  const requiresCustomDeliveryTimeline = isCustomOrder || duration === 'Custom';
  const standardDeliveryTimeline = isDocumentary
    ? duration === '5 mins'
      ? '4 Days'
      : duration === '10 mins'
        ? '7 Days'
        : duration === '15 mins'
          ? '10 Days'
          : 'To be discussed'
    : '2-3 Days';
  const deliveryTimeline = requiresCustomDeliveryTimeline
    ? customDelivery.trim() || 'Not specified'
    : standardDeliveryTimeline;
  const estimatedPrice = isDocumentary
    ? documentaryPrices[duration] || 'Price will be discussed in chat'
    : isShorts
      ? shortsPrices[duration] || 'Price will be discussed in chat'
      : 'Price will be discussed in chat';
  const finalOrderPrice = estimatedPrice;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (duration === 'Custom' && !customDuration.trim()) {
      setError('Please enter your video duration.');
      return;
    }

    if (isCustomOrder && videoType === 'Type your category' && !customVideoType.trim()) {
      setError('Please enter your video type.');
      return;
    }

    if (requiresCustomDeliveryTimeline && !customDelivery.trim()) {
      setError('Please enter your required delivery timeline.');
      return;
    }

    const whatsappVideoTypeLine = isCustomOrder ? `\n- Video Type: ${selectedVideoType}` : '';
    const emailVideoTypeLine = isCustomOrder ? `\nVideo Type: ${selectedVideoType}` : '';
    const whatsappDeliveryLine = '\n- Delivery Needed: ' + deliveryTimeline;
    const emailDeliveryLine = '\nDelivery Needed: ' + deliveryTimeline;

    if (communication === 'WhatsApp') {
      const message = `Hi Borshon! I want to book the ${packageName} package.${whatsappVideoTypeLine}\n- Duration: ${selectedDuration}\n- Total Price: ${finalOrderPrice}${whatsappDeliveryLine}`;
      window.open(`https://wa.me/+8801750071200?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType: packageName,
          message: `Booking request\n\nPackage: ${packageName}${emailVideoTypeLine}\nDuration: ${selectedDuration}\nTotal Price: ${finalOrderPrice}${emailDeliveryLine}\nCommunication Preference: Email`,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your booking request.');
      }

      setIsComplete(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to send your booking request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <section className="rounded-[28px] border border-[#d9dbe0] bg-white p-7 text-center shadow-[0_16px_50px_rgba(20,20,25,0.06)] sm:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#17171d] text-white">
          <CheckCircle2 size={27} />
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-[#7a7b83]">Booking received</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.04em] text-[#15151a] sm:text-4xl">
          Thanks, {name.trim()}.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#53545d]">
          Your request for {packageName} has been sent. I&apos;ll reply to {email.trim()} with the next steps.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#17171d] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Back to portfolio
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-[28px] border border-[#d9dbe0] bg-white p-5 shadow-[0_16px_50px_rgba(20,20,25,0.06)] sm:p-8">
      <div className="rounded-2xl border border-[#d9dbe0] bg-[#f7f7f8] px-4 py-3 text-sm text-[#53545d]">
        <span className="font-medium text-[#7a7b83]">Selected Package: </span>
        <span className="font-semibold text-[#15151a]">{packageName}</span>
      </div>

      <div className="mt-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a7b83]">Start your booking</p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-[-0.04em] text-[#15151a] sm:text-4xl">
          Let&apos;s plan your edit.
        </h1>
        <p className="mt-3 text-sm leading-6 text-[#53545d]">Share the essentials and I&apos;ll take it from there.</p>
      </div>

      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-sm font-semibold text-[#15151a]">1. Communication preference</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <ChoiceCard active={communication === 'WhatsApp'} onClick={() => setCommunication('WhatsApp')}>
              <span className="flex items-center gap-2"><MessageCircle size={16} /> WhatsApp</span>
            </ChoiceCard>
            <ChoiceCard active={communication === 'Email'} onClick={() => setCommunication('Email')}>
              <span className="flex items-center gap-2"><Mail size={16} /> Email</span>
            </ChoiceCard>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-[#15151a]">2. Video details</legend>
          {isCustomOrder && (
            <div className="mt-4">
              <p className="text-xs font-medium text-[#53545d]">Video type</p>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {videoTypeOptions.map((option) => (
                  <ChoiceCard key={option} active={videoType === option} onClick={() => setVideoType(option)}>
                    {option}
                  </ChoiceCard>
                ))}
              </div>
              {videoType === 'Type your category' && (
                <label className="mt-3 block">
                  <span className="sr-only">Custom video type</span>
                  <input
                    type="text"
                    required
                    value={customVideoType}
                    onChange={(event) => setCustomVideoType(event.target.value)}
                    placeholder="Type your video category"
                    className="w-full rounded-xl border border-[#d9dbe0] bg-white px-4 py-3 text-sm text-[#15151a] outline-none transition focus:border-[#17171d] focus:ring-2 focus:ring-[#17171d]/10"
                  />
                </label>
              )}
            </div>
          )}
          <div className="mt-4">
            <p className="text-xs font-medium text-[#53545d]">Video duration</p>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {availableDurationOptions.map((option) => (
                <ChoiceCard key={option} active={duration === option} onClick={() => setDuration(option)}>
                  {option}
                </ChoiceCard>
              ))}
            </div>
            <div aria-live="polite" className="mt-3 flex items-center justify-between rounded-2xl border border-[#d9dbe0] bg-[#f7f7f8] px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a7b83]">Estimated price</span>
              <span className="font-serif text-lg font-semibold tracking-[-0.03em] text-[#15151a]">{estimatedPrice}</span>
            </div>
            {duration === 'Custom' && (
              <label className="mt-3 block">
                <span className="sr-only">Custom video duration</span>
                <input
                  type="text"
                  value={customDuration}
                  onChange={(event) => setCustomDuration(event.target.value)}
                  placeholder="e.g. 7 minutes"
                  className="w-full rounded-xl border border-[#d9dbe0] bg-white px-4 py-3 text-sm text-[#15151a] outline-none transition focus:border-[#17171d] focus:ring-2 focus:ring-[#17171d]/10"
                />
              </label>
            )}
          </div>

          {requiresCustomDeliveryTimeline ? (
            <label className="mt-6 block">
              <span className="flex items-center gap-2 text-xs font-medium text-[#53545d]"><Clock3 size={14} /> Delivery timeline</span>
              <input
                type="text"
                required
                value={customDelivery}
                onChange={(event) => setCustomDelivery(event.target.value)}
                placeholder="Enter delivery timeframe / deadline"
                className="mt-2 w-full rounded-xl border border-[#d9dbe0] bg-white px-4 py-3 text-sm text-[#15151a] outline-none transition focus:border-[#17171d] focus:ring-2 focus:ring-[#17171d]/10"
              />
              <p className="mt-2 text-xs leading-5 text-[#7a7b83]">⚡ Need faster delivery? Please discuss via chat before placing your order.</p>
            </label>
          ) : (
            <div className="mt-6">
              <p className="flex items-center gap-2 text-xs font-medium text-[#53545d]"><Clock3 size={14} /> Estimated delivery timeline</p>
              <p className="mt-2 rounded-xl border border-[#d9dbe0] bg-[#f7f7f8] px-4 py-3 text-sm font-medium text-[#15151a]">{standardDeliveryTimeline}</p>
              <p className="mt-2 text-xs leading-5 text-[#7a7b83]">⚡ Need faster delivery? Please discuss via chat before placing your order.</p>
            </div>
          )}

          <div aria-live="polite" className="mt-4 rounded-2xl border border-[#d9dbe0] bg-[#f7f7f8] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7a7b83]">Price summary</p>
            {estimatedPrice === 'Price will be discussed in chat' ? (
              <p className="mt-3 font-serif text-lg font-semibold tracking-[-0.03em] text-[#15151a]">{estimatedPrice}</p>
            ) : (
              <dl className="mt-3 space-y-2 text-sm text-[#53545d]">
                <div className="flex items-center justify-between gap-4">
                  <dt>Base Price</dt>
                  <dd className="font-medium text-[#15151a]">{estimatedPrice}</dd>
                </div>
                <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#d9dbe0] pt-3">
                  <dt className="font-semibold text-[#15151a]">Total Price</dt>
                  <dd className="font-serif text-xl font-semibold tracking-[-0.03em] text-[#15151a]">{finalOrderPrice}</dd>
                </div>
              </dl>
            )}
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-[#15151a]">
            {communication === 'Email' ? 'Your details' : 'Your details (optional)'}
          </legend>
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#53545d]">Client name{communication === 'Email' ? '' : ' (optional)'}</span>
            <input
              type="text"
              required={communication === 'Email'}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="w-full rounded-xl border border-[#d9dbe0] bg-white px-4 py-3 text-sm text-[#15151a] outline-none transition focus:border-[#17171d] focus:ring-2 focus:ring-[#17171d]/10"
            />
          </label>
          {communication === 'Email' && (
            <label className="block">
              <span className="mb-2 block text-xs font-medium text-[#53545d]">Email address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#d9dbe0] bg-white px-4 py-3 text-sm text-[#15151a] outline-none transition focus:border-[#17171d] focus:ring-2 focus:ring-[#17171d]/10"
              />
            </label>
          )}
        </fieldset>

        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17171d] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(23,23,29,0.16)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
        >
          {isSubmitting ? 'Sending request…' : 'Done'} <Send size={16} />
        </button>
      </form>
    </section>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f6] px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-[#53545d] transition-colors hover:text-[#15151a]">
          <ArrowLeft size={16} /> Back to portfolio
        </Link>
        <div className="mt-8">
          <Suspense fallback={<div className="h-[760px] rounded-[28px] border border-[#d9dbe0] bg-white" />}>
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}