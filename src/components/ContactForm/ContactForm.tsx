import React, { FormEvent, useState, useEffect, useRef, Fragment } from "react";
import { useForm } from "@formspree/react";
import { getI18n, useTranslation } from "react-i18next";
import autoAnimate from "@formkit/auto-animate";
import "./ContactForm.css";

const contactForm = () => {
    const [state, handleSubmit] = useForm("mayzkojd");
    const [errorState, setErrorMessage] = useState([{ type: "", message: "" }]);
    const { t } = useTranslation("contactForm");
    const isFirstRender = useRef(true);
    const formRef = useRef(null);
    const formWrapperRef = useRef(null);

    // Handle submit and errors
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        var formErrors = state.errors?.getAllFieldErrors();

        if (formErrors === undefined) {
            console.debug("No errors returned from form.")
            setErrorMessage((prevState) => [
                ...prevState,
                {
                    type: "UNDEFINED",
                    message: t("contactForm:SubmitError"),
                },
            ]);
            return;
        }

        formErrors.map((x) => {
            x[1].map((e) => {
                validateError(e.code, e.message);
            })
        });

        setErrorMessage((prevState) => [
            ...prevState,
            {
                type: "CORRECT_FIELDS",
                message: t("contactForm:ERROR_CORRECT_FIELDS"),
            },
        ]);

    }, [state.errors]);

    // Animate form
    useEffect(() => {
        formRef.current && autoAnimate(formRef.current);
        formWrapperRef.current && autoAnimate(formWrapperRef.current);
    }, [formRef, formWrapperRef]);

    // Validate form submission errors
    const validateError = (errorCode: string, errorMessage: string) => {
        switch (errorCode) {
            case "TYPE_EMAIL":
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: "EMAIL",
                        message: t("contactForm:ERROR_TYPE_EMAIL"),
                    },
                ]);
                break;
            case "TYPE_TEXT":
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: "TEXT",
                        message: t("contactForm:ERROR_TYPE_TEXT"),
                    },
                ]);
                break;
            default:
                setErrorMessage((prevState) => [
                    ...prevState,
                    {
                        type: errorCode?? "UNDEFINED",
                        message: errorMessage,
                    },
                ]);
                break;
        }
    };

    return (
        <div ref={formWrapperRef}>
            {state.succeeded && (
                <div id="submit-success">
                    <p>{t("contactForm:SubmitSuccess")}</p>
                </div>
            )}
            {!state.succeeded && (
                <form id="fs-frm" ref={formRef} name="simple-contact-form" onSubmit={handleSubmit}>
                    <fieldset id="fs-frm-inputs">
                        <label htmlFor="full-name">{t("contactForm:FullName")}</label>
                        <input type="text" autoComplete="name" name="name" id="full-name" placeholder={t("contactForm:NameAndSurname") as string} required />
                        <label htmlFor="email">{t("contactForm:EmailAddress")}</label>
                        <input id="email" autoComplete="email" type="email" name="email" placeholder="@" required />
                        {errorState.some((key) => key.type === "EMAIL") && <p className="error">{errorState.find((item) => item.type === "EMAIL")?.message}</p>}
                        <label htmlFor="message">{t("contactForm:Message")}</label>
                        <textarea rows={5} name="message" id="message" placeholder={t("contactForm:MessagePlaceholder") as string} required></textarea>
                        {errorState.some((key) => key.type === "TEXT") && <p className="error">{errorState.find((item) => item.type === "TEXT")?.message}</p>}
                        <input type="hidden" name="_subject" id="email-subject" value="New resume submission" />
                        <input type="hidden" name="_language" value="cs" />
                    </fieldset>
                    {errorState.some((key) => key.type === "CORRECT_FIELDS") && <p className="error">{errorState.find((item) => item.type === "CORRECT_FIELDS")?.message}</p>}
                    {errorState.some((key) => key.type === "UNDEFINED") && <p className="error">{errorState.find((item) => item.type === "UNDEFINED")?.message}</p>}
                    <button type="submit" id="fs-frm-submit-button" className="button" disabled={state.submitting}>
                        {t("contactForm:Submit")}
                    </button>
                </form>
            )}
        </div>
    );
};

export default contactForm;
