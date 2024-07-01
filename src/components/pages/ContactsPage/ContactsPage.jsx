import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { validate } from "email-validator";
import useElementOnScreen from "../../../utils/useElementOnScreen";
import AnimatedTitle from "../../animations/TitleAnimation/AnimatedTitle";
import {
  ContactsPageContainer,
  EmailInput,
  ErrorMessage,
  MessageTextarea,
  NameInput,
  NotificationMessage,
  SendButton,
  StyledForm,
} from "./ContactsPage.styled";
const SERVICE_ID = "service_xaz4bqn";
const TEMPLATE_ID = "template_j4rx75v";
const PUBLIC_KEY = "vivlE7CLGyjKHeY66";

function ContactsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    type: "",
    message: "",
  });
  const textAreaRef = useRef(null);
  const [formRef, isFormVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validate(email)) {
        setEmailErrorMessage(
          "Please provide your email address so I can get back to you!"
        );
        return;
      }
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
    } catch (error) {
      setNotificationMessage({
        type: "fail",
        message: "Something went wrong! Please try again!",
      });
    }
  };

  useEffect(() => {
    if (!notificationMessage.message) {
      return;
    }
    setTimeout(() => {
      setNotificationMessage({
        type: "",
        message: "",
      });
    }, 5000);
  }, [notificationMessage]);

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + 1 + "px";
    }
  }, [textAreaRef, message]);

  return (
    <ContactsPageContainer id="contacts">
      <AnimatedTitle text={["Contact", "Me"]} />
      <StyledForm ref={formRef} onSubmit={handleFormSubmit}>
        <NotificationMessage $type={notificationMessage.type}>
          {notificationMessage.message}
        </NotificationMessage>
        <NameInput
          type="text"
          placeholder="Your name *"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          $isFormVisible={isFormVisible}
        />
        <EmailInput
          type="text"
          placeholder="Your email *"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailErrorMessage("");
          }}
          $isFormVisible={isFormVisible}
        />
        <ErrorMessage $isVisible={!!emailErrorMessage}>
          {emailErrorMessage}
        </ErrorMessage>
        <MessageTextarea
          ref={textAreaRef}
          placeholder="Your message *"
          name="message"
          value={message}
          rows={1}
          onChange={(e) => setMessage(e.target.value)}
          $isFormVisible={isFormVisible}
        />
        <SendButton
          disabled={!name || !email || !message}
          $isFormVisible={isFormVisible}
        >
          Send
        </SendButton>
      </StyledForm>
    </ContactsPageContainer>
  );
}

export default ContactsPage;
