import { ChangeEvent, ComponentProps, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { validate } from "email-validator";
import useElementOnScreen from "../../../utils/useElementOnScreen";
import AnimatedTitle from "../../animations/TitleAnimation/AnimatedTitle";
import {
  ContactsPageContainer,
  EmailInput,
  ErrorMessage,
  FindMeP,
  MessageTextarea,
  NameInput,
  NotificationMessage,
  NotificationType,
  SendButton,
  StyledA,
  StyledForm,
} from "./ContactsPage.styled";
import LinkedinIcon from "../../svgs/LinkedinIcon";
import GithubIcon from "../../svgs/GithubIcon";

const SERVICE_ID = "service_xaz4bqn";
const TEMPLATE_ID = "template_j4rx75v";
const PUBLIC_KEY = "vivlE7CLGyjKHeY66";
const MAX_MESSAGE_LENGTH = 5000;

interface NotificationState {
  type: NotificationType;
  message: string;
}

type FormSubmitEvent = Parameters<
  NonNullable<ComponentProps<"form">["onSubmit"]>
>[0];

function ContactsPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");
  const [notificationMessage, setNotificationMessage] =
    useState<NotificationState>({
      type: "",
      message: "",
    });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [formRef, isFormVisible] = useElementOnScreen<HTMLFormElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  });

  useEffect(() => {
    if (!isFormVisible) {
      setFormErrorMessage("");
    }
  }, [isFormVisible]);

  useEffect(() => {
    if (!notificationMessage.message) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setNotificationMessage({
        type: "",
        message: "",
      });
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [notificationMessage]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "0px";
      const scrollHeight = textArea.scrollHeight;
      textArea.style.height = scrollHeight + 1 + "px";
    }
  }, [message]);

  const handleFormSubmit = async (e: FormSubmitEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    try {
      if (trimmedName.length < 2 || trimmedName.length > 100) {
        setFormErrorMessage("Please enter a name between 2 and 100 characters.");
        return;
      }
      if (!validate(email)) {
        setFormErrorMessage(
          "Please provide your email address so I can get back to you!"
        );
        return;
      }
      if (!trimmedMessage) {
        setFormErrorMessage("Please enter a message before sending.");
        return;
      }
      if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
        setFormErrorMessage(
          `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`
        );
        return;
      }
      if (!formRef.current) {
        return;
      }
      setFormErrorMessage("");
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      setName("");
      setEmail("");
      setMessage("");
      setNotificationMessage({
        type: "success",
        message: "Your message was sent successfully!",
      });
    } catch {
      setNotificationMessage({
        type: "fail",
        message: "Something went wrong! Please try again!",
      });
    }
  };

  return (
    <ContactsPageContainer id="contacts" $isFormVisible={isFormVisible}>
      <AnimatedTitle text={["Contact", "Me"]} />
      <StyledForm ref={formRef} onSubmit={handleFormSubmit}>
        <NotificationMessage $type={notificationMessage.type} role="status" aria-live="polite">
          {notificationMessage.message}
        </NotificationMessage>
        <NameInput
          type="text"
          placeholder="Your name *"
          name="name"
          minLength={2}
          maxLength={100}
          required
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
            setFormErrorMessage("");
          }}
          $isFormVisible={isFormVisible}
        />
        <EmailInput
          type="email"
          placeholder="Your email *"
          name="email"
          required
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
            setFormErrorMessage("");
          }}
          $isFormVisible={isFormVisible}
        />
        <ErrorMessage $isVisible={!!formErrorMessage} role="alert" aria-live="assertive">
          {formErrorMessage}
        </ErrorMessage>
        <MessageTextarea
          ref={textAreaRef}
          placeholder="Your message *"
          name="message"
          value={message}
          maxLength={MAX_MESSAGE_LENGTH}
          required
          rows={1}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value);
            setFormErrorMessage("");
          }}
          $isFormVisible={isFormVisible}
        />
        <SendButton
          disabled={!name.trim() || !email.trim() || !message.trim()}
          $isFormVisible={isFormVisible}
        >
          Send
        </SendButton>
      </StyledForm>
      <FindMeP>
        Find me also on{" "}
        <StyledA
          href="https://www.linkedin.com/in/ina-davidova/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Ina Davidova on LinkedIn"
          $isFormVisible={isFormVisible}
        >
          <LinkedinIcon />
        </StyledA>
        and
        <StyledA
          href="https://github.com/InaDavidova"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Ina Davidova on GitHub"
          $isFormVisible={isFormVisible}
        >
          <GithubIcon />
        </StyledA>
      </FindMeP>
    </ContactsPageContainer>
  );
}

export default ContactsPage;
