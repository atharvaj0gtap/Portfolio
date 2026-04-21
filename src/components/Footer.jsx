import React from "react";

const Footer = () => {
    return (
        <>
            {/* Contact CTA Section */}
            <section id="contact" className="py-20 md:py-28 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <p className="font-mono text-xs tracking-[0.3em] uppercase text-gold mb-6">Get in Touch</p>
                    <h2 className="font-display text-3xl md:text-5xl font-normal text-text-primary mb-5 tracking-tight">
                        Let's Build Something Together
                    </h2>
                    <p className="text-text-secondary mb-10 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
                        Available for full-time roles, freelance projects, and interesting collaborations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href="mailto:atharva@jagtapworks.com"
                            className="px-8 py-3.5 bg-gold hover:bg-gold-dark text-surface-base font-semibold rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/25 text-sm tracking-wide"
                        >
                            atharva@jagtapworks.com
                        </a>
                        <a
                            href="https://www.linkedin.com/in/atharvahjagtap/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-3.5 border border-border-strong text-text-secondary hover:text-text-primary hover:border-accent-main/40 rounded-lg transition-all duration-300 text-sm tracking-wide"
                        >
                            Connect on LinkedIn
                        </a>
                    </div>
                </div>
            </section>

            {/* Standard Footer */}
            <footer className="bg-surface-raised/50 border-t border-border-subtle">
                <div className="w-full max-w-screen-xl mx-auto px-6 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="font-display text-lg text-text-secondary">JagtapWorks</span>

                        <div className="flex items-center gap-5">
                            <a href="https://github.com/atharvaj0gtap" className="text-text-muted hover:text-text-secondary transition-colors" aria-label="GitHub">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/atharvahjagtap/" className="text-text-muted hover:text-text-secondary transition-colors" aria-label="LinkedIn">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                                </svg>
                            </a>
                            <a href="mailto:atharva@jagtapworks.com" className="text-text-muted hover:text-text-secondary transition-colors" aria-label="Email">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs text-text-muted">
                            &copy; {new Date().getFullYear()} JagtapWorks. All Rights Reserved.
                        </span>
                        <div className="flex gap-4 text-xs text-text-muted">
                            <a href="#certifications" className="hover:text-text-secondary transition-colors">Certifications</a>
                            <a href="/assets/certifications/AtharvaJagtap_Resume.pdf" download className="hover:text-text-secondary transition-colors">Resume</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
