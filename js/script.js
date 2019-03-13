var numbers = document.getElementsByClassName("number");
var operations = document.getElementsByClassName('operation');
var CeBtns = document.getElementsByClassName('CeBtn')
var decimalBtn = document.getElementById('decimal');
var arrowBtn = document.getElementById('arrow');
var display = document.getElementById('number');
var memoryNumber = 0;
var neg = document.getElementById('plusmn');
var memoryNewNumber = false;
var memoryPendingOperation = '';
for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function (e) {
        numberPress(e.target.textContent);
    });
}
for (var i = 0; i < operations.length; i++) {
    var operationBtn = operations[i];
    operationBtn.addEventListener('click', function (e) {
         operat(e.target.textContent);
    });
}
for (var i = 0; i < CeBtns.length; i++) {
    var CeBtnss = CeBtns[i];
    CeBtnss.addEventListener('click', function (e) {
        clear(e.srcElement.id)
    });
}
decimalBtn.addEventListener('click', decimal);
arrowBtn.addEventListener('click', arrow);
neg.addEventListener('click', Neg);

function Neg() {
    display.value = parseFloat(display.value * -1);
}

function arrow() {
    if (display.value.length <= 1) {
        display.value = 0;
        console.log(display.value);
    }
    else {
        display.value = display.value.substring(0, display.value.length - 1);
    }
}

function numberPress(numb) {
    if (memoryNewNumber) {
        display.value = numb;
        memoryNewNumber = false;
    }
    else {
        if (display.value === "0") {
            display.value = numb;
        }
        else {
            display.value += numb;
        }
    }
};


function operat(op) {
    var localMemory = display.value;
    if (memoryNewNumber && memoryPendingOperation !== '=') {
        display.value = memoryNumber;
    }
    else {
        memoryNewNumber = true;
        if (memoryPendingOperation === '+') {
            memoryNumber += parseFloat(localMemory);
        }
        else if (memoryPendingOperation === '-') {
            memoryNumber -= parseFloat(localMemory);
        }
        else if (memoryPendingOperation === '*') {
            memoryNumber *= parseFloat(localMemory);
        }
        else if (memoryPendingOperation === '/') {
            memoryNumber /= parseFloat(localMemory);
        }
        else {
            memoryNumber = parseFloat(localMemory);
        };
        display.value = memoryNumber;
        memoryPendingOperation = op;
    };
};

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        memoryNewNumber = true;
    }
    else if (id === 'c') {
        display.value = '0';
        memoryNewNumber = true;
        memoryNumber = 0;
        memoryPendingOperation = '';
    };
    console.log(id);
}

function decimal() {
    var localDecimal = display.value;
    if (memoryNumber) {
        localDecimal = "0.";
        memoryNewNumber = false;
    }
    else {
        if (localDecimal.indexOf('.') === -1) {
            localDecimal += "."
        };
    };
    display.value = localDecimal;
}