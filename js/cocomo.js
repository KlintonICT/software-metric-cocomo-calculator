(() => {
    let kloc;
    let cost;
    let effort;
    let devTime;
    let people;
    let total;

    const displayResult = () => {
        document.getElementById('effort').value  = parseFloat(effort).toFixed(2);
        document.getElementById('devTime').value = parseFloat(devTime).toFixed(2);
        document.getElementById('people').value  = people;
        document.getElementById('total').value   = parseFloat(total).toFixed(2);
    }

    const calculate = (a, b, c, d) => {
        effort  = a * Math.pow(kloc, b);
        devTime = c * Math.pow(effort, d);
        people  = Math.round(effort / devTime);
        total   = people * cost * devTime; 
        displayResult();
    }

    const organicCalculation = () => {
        const a = 2.4; 
        const b = 1.05;
        const c = 2.5;
        const d = 0.38;
        calculate(a, b, c, d);
    }

    const semiDetCalculation = () => {
        const a = 3.0; 
        const b = 1.12;
        const c = 2.5;
        const d = 0.35;
        calculate(a, b, c, d);
    }

    const embededCalculation = () => {
        const a = 3.6; 
        const b = 1.2;
        const c = 2.5;
        const d = 0.32;
        calculate(a, b, c, d);
    }

    const onCalculate = () => {
        const formElem = document.getElementById('form');
        const mode = document.getElementsByName('mode');

        kloc = formElem.kloc.value; 
        cost = formElem.cost.value;

        let alert = alerting();

        if( !alert ){
            mode.forEach(mode => {
                if( mode.checked ){
                    switch( mode.value ){
                        case 'organic' : organicCalculation(); break;
                        case 'semi'    : semiDetCalculation(); break;
                        case 'embed'   : embededCalculation(); break;
                        default : break; 
                    }
                }
            })
        } 
    }

    const alerting = () => {
        if(kloc.length === 0) { alert('Please enter KLOC'); return true }
        if(cost.length === 0) { alert('Please enter Cost'); return true }
        return false;
    }

    const onSubmit = ( event ) => {
        event.preventDefault();
    }

    const setupListeners = () => {
        const formElem = document.getElementById('form');
        formElem.addEventListener('submit',  onSubmit);

        const calculateElem = document.getElementById('calculate');
        calculateElem.addEventListener('click', onCalculate);
    }

    const run = () => {
        setupListeners();
    }
    run();
})();
  