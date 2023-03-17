// Convert button
const convert_btn = document.getElementById("convert_btn");
const result_element = document.getElementById("result");
const error_msg = document.getElementById("error_msg");

convert_btn.addEventListener("click", function () {
    const input_element = document.getElementById("to_convert");
    const binary_number = input_element.value;
    const array_binary = binary_number.split("");

    let only_binaries = true;
    for (let i = 0; i < array_binary.length; i++) {
        if (array_binary[i] != "0" && array_binary[i] != "1") {
            only_binaries = false;
            break;
        }
    }

    if (only_binaries) {
        const decimal_number = parseInt(binary_number, 2);
        result_element.value = decimal_number;
        error_msg.style.display = "none";
    } else {
        // wrong input
        error_msg.style.display = "block";
    }
    document.getElementById("to_convert").focus();
});

// Clear button
clear_btn = document.getElementById("clear_btn");

clear_btn.addEventListener("click", function () {
    let input_to_clean = document.getElementById("to_convert");
    input_to_clean.value = "";
    input_to_clean.placeholder = "00000000";
    result_element.value = "";
    result_element.placeholder = "0";
    document.getElementById("to_convert").focus();
    error_msg.style.display = "none";
});
