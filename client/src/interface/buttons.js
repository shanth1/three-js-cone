export const activateButton = (button) => {
    button.disabled = false;
    button.classList.add("form__button_active");
};

export const deactivateButton = (button) => {
    button.disabled = true;
    button.classList.remove("form__button_active");
};
