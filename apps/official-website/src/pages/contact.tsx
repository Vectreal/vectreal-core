import { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TitleSection from "@/components/title-section";

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data, formData);
  };

  return (
    <TitleSection heading="Contact">
      <div className="w-full max-w-2xl flex flex-col gap-8">
        <p className="text-xl text-muted-foreground">
          We&apos;d love to hear from you. Please fill out the form below and
          we&apos;ll get back to you as soon as possible.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="What&apos;s your name?"
            className="input"
          />

          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="What&apos;s your email?"
            className="input"
          />

          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="What would you like to say?"
            className="textarea"
            rows={4}
          />
          <Button type="submit" className="w-full">
            Send message
          </Button>
        </form>
      </div>
    </TitleSection>
  );
};

export default Contact;
