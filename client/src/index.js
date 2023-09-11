import "./styles.scss";
import { checkConeForm } from "@/validation/coneForm";
import { state } from "@/model/state";

import { Scene } from "./model/Scene";
import { loadFigure } from "./model/triangulation";
import { activateButton, deactivateButton } from "./interface/buttons";

const rootElement = document.getElementById("three-js");
const parentElement = rootElement.parentElement;
const { offsetWidth, offsetHeight } = parentElement;

const scene = new Scene(offsetWidth, offsetHeight, rootElement);
scene.addLight();
scene.start();

loadFigure(scene, state);

addEventListener("resize", () => {
    const { offsetWidth, offsetHeight } = parentElement;
    scene.updateScene(offsetWidth, offsetHeight);
});

const formElement = document.getElementById("form");
formElement.onsubmit = (e) => {
    e.preventDefault();
    loadFigure(scene, state);
};

const inputElements = new Array(...document.getElementsByTagName("input"));
inputElements.forEach((element) => {
    element.value = state[element.name];
});

const sendButton = document.getElementById("send");
if (checkConeForm(state)) {
    activateButton(sendButton);
} else {
    deactivateButton(sendButton);
}

inputElements.forEach((element) => {
    element.oninput = (e) => {
        if (!isNaN(e.target.value)) {
            state[element.name] = e.target.value;
        }
        e.target.value = state[element.name];
        if (checkConeForm(state)) {
            activateButton(sendButton);
        } else {
            deactivateButton(sendButton);
        }
    };
});
