import React, { FormEvent, useState, useEffect, useRef, Fragment } from "react";
import { FormError, useForm, ValidationError } from "@formspree/react";
import { getI18n, useTranslation } from "react-i18next";
import autoAnimate from "@formkit/auto-animate";
import "./ContactForm.css";

const contactForm = () => {
    const [state, handleSubmit] = useForm("mayzkojd", {
        debug: true,
    });
    const [errorState, setErrorMessage] = useState([{ type: "", message: "" }]);
    const { t } = useTranslation("contactForm");
    const isFirstRender = useRef(true);
    const formRef = useRef(null);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        validateError(state.errors);
    }, [state.errors]);

    useEffect(() => {
        formRef.current && autoAnimate(formRef.current);
    }, [formRef]);

    const validateError = (errors: FormError[]) => {
        if (errors.length === 0) {
            console.log("0");
            return undefined;
        }

        errors.forEach((e) => {
            switch (e.code) {
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
                            type: e.code,
                            message: e.message,
                        },
                    ]);
                    break;
            }
        });
    };

    if (state.succeeded) {
        return <p>{t("contactForm:SubmitSuccess")}</p>;
    }

    return (
        <form id="fs-frm" ref={formRef} name="simple-contact-form" onSubmit={handleSubmit}>
            <fieldset id="fs-frm-inputs">
                <label htmlFor="full-name">{t("contactForm:FullName")}</label>
                <input type="text" name="name" id="full-name" placeholder={t("contactForm:NameAndSurname") as string} required />
                <label htmlFor="email">{t("contactForm:EmailAddress")}</label>
                <input id="email" type="email" name="email" placeholder="@" required />
                {errorState.some((key) => key.type === "EMAIL") && <p className="error">{errorState.find((item) => item.type === "EMAIL")?.message}</p>}
                <label htmlFor="message">{t("contactForm:Message")}</label>
                <textarea rows={5} name="message" id="message" placeholder={t("contactForm:MessagePlaceholder") as string} required></textarea>
                {errorState.some((key) => key.type === "TEXT") && <p className="error">{errorState.find((item) => item.type === "EMAIL")?.message}</p>}
                <input type="hidden" name="_subject" id="email-subject" value="New resume submission from {{ name }}" />
                <input type="hidden" name="_language" value="cs" />
            </fieldset>
            {errorState.some((key) => key.type != "") && <p className="error">{t("contactForm:ERROR_CORRECT_FIELDS")}</p>}
            <button type="submit" id="fs-frm-submit-button" className="button" disabled={state.submitting}>
                {t("contactForm:Submit")}
            </button>
        </form>
    );
};

export default contactForm;
