import { IconBrandGithub, IconKeyboard } from "@tabler/icons-react";

const linkClass =
  "underline text-[var(--color-electric)] hover:text-[var(--color-neon)] transition-colors mx-1";

export function HomePage() {
  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-medium text-[var(--color-text)] text-center tablet:text-left">
            Welcome to Sofle Studio
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            An offline-friendly
            <a
              href="https://zmk.studio/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              ZMK Studio
            </a>
            tailored for the Eyelash Sofle keyboard — a fork of
            <a
              href="https://github.com/cormoran/dya-studio"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              DYA Studio
            </a>
            by cormoran. Open source under AGPL-3.0.
          </p>
        </div>

        {/* Features */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
            What you can do
          </h2>
          <div className="text-sm text-[var(--color-text-muted)] space-y-4">
            <ul className="list-disc list-outside space-y-2 pl-5">
              <li>
                Customize your keymap with a friendlier UI, equivalent to ZMK
                Studio.
              </li>
              <li>
                Tune pointing-device sensitivity, automatic layer switching, and
                other input-processor settings.
              </li>
              <li>
                Review the battery-consumption history stored on the device.
              </li>
              <li>Name BLE connection targets and unpair them.</li>
              <li>
                Adjust device settings such as the idle/sleep timeout.
              </li>
            </ul>
            <p>
              It works fully offline — install it once and it runs without a
              network connection. See the Q&amp;A below for details.
            </p>
          </div>
        </div>

        {/* The keyboard */}
        <div className="glass-card p-6 mb-6">
          <h2 className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
            The keyboard
          </h2>
          <div className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-3">
              <IconKeyboard
                size={20}
                className="text-[var(--color-electric)] flex-shrink-0"
              />
              <div>
                <p className="text-sm font-medium text-[var(--color-text-secondary)]">
                  Eyelash Sofle
                </p>
                <span className="text-xs text-[var(--color-text-muted)]">
                  A 64-key split keyboard with a rotary encoder, running ZMK.
                </span>
              </div>
            </div>
            <a
              href="https://github.com/rdlu/zmk-sofle"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline text-[var(--color-electric)] hover:text-[var(--color-neon)] transition-colors sm:ml-auto"
            >
              <IconBrandGithub size={16} />
              Firmware
            </a>
          </div>
        </div>

        {/* Q&A */}
        <div className="glass-card p-6">
          <h2 className="text-sm font-medium text-[var(--color-text-secondary)] mb-4">
            Q&amp;A
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium text-[var(--color-text)] mb-1">
                Q: Can my keyboard work with Sofle Studio?
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                A: Yes. Any ZMK keyboard with ZMK Studio enabled works for
                keymap editing — Sofle Studio speaks the standard ZMK Studio
                protocol. It is tailored for the Eyelash Sofle, but not limited
                to it.
              </p>
            </div>
            <div>
              <p className="font-medium text-[var(--color-text)] mb-1">
                Q: Can I get the source code of Sofle Studio?
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                A: Yes. Sofle Studio is open source under the
                <strong className="mx-1">AGPL-3.0</strong>
                license — a fork of
                <a
                  href="https://github.com/cormoran/dya-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  DYA Studio
                </a>
                by cormoran. Browse the code or file feedback at
                <a
                  href="https://github.com/rdlu/sofle-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  github.com/rdlu/sofle-studio
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
