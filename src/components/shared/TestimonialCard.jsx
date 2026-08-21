"use client";

import { useState } from "react";
import { authorInitials } from "../../constants/testimonials";

/**
 * The threshold past which a testimonial collapses. Measured in characters,
 * not pixels: measuring height would have to happen after rendering, and the
 * card would visibly jump in front of the reader.
 *
 * 260 is roughly six lines in a column this wide. Precision does not matter:
 * being a line out changes nothing.
 */
const CLAMP_THRESHOLD = 260;

export default function TestimonialCard({ testimonial, tone, allowExpand = true }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const isLong = testimonial.content.length > CLAMP_THRESHOLD;
    const isClamped = isLong && allowExpand && !isExpanded;

    return (
        // h-full stretches the card to the full height of its grid cell. Without it
        // pinning the signature to the bottom is impossible: the card ends where the
        // text ends, not where the row ends.
        <div
            className={`flex h-full w-full flex-col rounded-card border p-6 shadow-soft ${tone.card}`}
        >
            {/*
              text-md to text-lg, not text-lg to text-xl: in the Relume preset
              text-lg and text-xl are both 20px, so that "step" would change
              nothing. The preset replaces Tailwind's default scale with its own,
              exactly as it does with max-w-*.
            */}
            <blockquote
                className={`font-heading text-md font-semibold leading-relaxed md:text-lg ${tone.quote} ${
                    isClamped ? "line-clamp-6" : ""
                }`}
            >
                “{testimonial.content}”
            </blockquote>

            {isLong && allowExpand && (
                <button
                    type="button"
                    onClick={() => setIsExpanded((expanded) => !expanded)}
                    className={`mt-3 w-fit text-sm font-semibold underline underline-offset-4 transition-colors ${tone.more}`}
                >
                    {isExpanded ? "Згорнути" : "Читати повністю"}
                </button>
            )}

            {/*
              mt-auto eats all the free space above the signature and pushes it down.
              That is why names in one row now sit on the same line no matter
              whose testimonial is longer.
            */}
            <div className="mt-auto flex w-full items-center gap-3 pt-6">
                <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold ${tone.avatar}`}
                >
                    {authorInitials(testimonial.authorName)}
                </div>

                <div className="min-w-0">
                    <p className={`truncate font-semibold ${tone.name}`}>
                        {testimonial.authorName}
                    </p>

                    {/*
                      The role line is always rendered, even when none was given: otherwise
                      the signature is one line shorter and, next to its neighbours, the name
                      jumps down by 11 pixels. The fallback word is honest:
                      the author of a testimonial really is a client.
                    */}
                    <p className={`truncate text-sm ${tone.role}`}>
                        {testimonial.authorRole || "Клієнт"}
                    </p>
                </div>
            </div>
        </div>
    );
}
