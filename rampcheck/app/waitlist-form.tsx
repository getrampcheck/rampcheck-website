"use client";

import { FormEvent, useState } from "react";

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="waitlist-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Full name</span>
          <input autoComplete="name" name="name" placeholder="Ada Lovelace" required />
        </label>
        <label>
          <span>Work email</span>
          <input
            autoComplete="email"
            name="email"
            placeholder="you@company.com"
            type="email"
            required
          />
        </label>
        <label>
          <span>Company</span>
          <input autoComplete="organization" name="company" placeholder="Robotics lab or startup" required />
        </label>
        <label>
          <span>Role</span>
          <input name="role" placeholder="ML lead / engineer / founder" required />
        </label>
        <label>
          <span>Robot embodiment</span>
          <input name="embodiment" placeholder="e.g. Franka, UR5, ALOHA, custom" required />
        </label>
        <label>
          <span>Dataset size</span>
          <input name="dataset-size" placeholder="e.g. 40k episodes · 900 GB" required />
        </label>
      </div>
      <fieldset className="cloud-field">
        <legend>Cloud</legend>
        <label><input type="radio" name="cloud" value="aws" defaultChecked /><span>AWS</span></label>
        <label><input type="radio" name="cloud" value="azure" /><span>Azure</span></label>
        <label><input type="radio" name="cloud" value="both" /><span>Both / other</span></label>
      </fieldset>
      <button className="button button-dark form-submit" type="submit">
        Request access
      </button>
      <p className="form-note" role="status">
        {submitted
          ? "This preview is not connected to a waitlist yet. Your request was not sent."
          : "SMALL BATCHES · REPLY WITHIN A WEEK · NO SPAM, EVER"}
      </p>
    </form>
  );
}
