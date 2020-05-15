(() => {
    let introDriver = [
        'Rely', 'Data', 'Ruse', 'Docu', 'Cplx', 'Time', 'Stor', 'Pvol',
        'Acap', 'Pcap', 'Aexp', 'Pexp', 'Ltex', 'Pcon', 'Tool', 'Site',
        'Sced', 'Disc', 'Prec', 'Resl', 'Team', 'Pmat'
    ];
    let removeDi = [], removeC = [];

    const referenceSize = () => {
        const introForm = document.getElementById('intro-form');
        $('#introReqSize').on('change', () => {
            introForm.introDesSize.value = introForm.introReqSize.value;
            introForm.introCodSize.value = introForm.introReqSize.value;
        })
        $('#introDesSize').on('change', () => {
            introForm.introReqSize.value = introForm.introDesSize.value;
            introForm.introCodSize.value = introForm.introDesSize.value;
        })
        $('#introCodSize').on('change', () => {
            introForm.introDesSize.value = introForm.introCodSize.value;
            introForm.introReqSize.value = introForm.introCodSize.value;
        })
    }

    const functionPoint = () => {
        const req = document.getElementById('introReqUni');
        const reqLang = document.getElementById('introReqLang');
        reqLang.disabled = (req.value === 'KLOC') ? true : false;
        $('#introReqUni').on('change', () => {
            reqLang.disabled = (req.value === 'KLOC') ? true : false;
        })
    }
    const introAlert = () => {
        const introForm = document.getElementById('intro-form');
        if(introForm.introReqA.value.length === 0){ alert('Please enter requirement A'); return true;}
        if(introForm.introDesA.value.length === 0){ alert('Please enter Design A'); return true;}
        if(introForm.introCodA.value.length === 0){ alert('Please enter Coding A'); return true;}
        if(introForm.introReqB.value.length === 0){ alert('Please enter requirement B'); return true;}
        if(introForm.introDesB.value.length === 0){ alert('Please enter Design B'); return true;}
        if(introForm.introCodB.value.length === 0){ alert('Please enter Coding B'); return true;}
        if(introForm.introReqSize.value.length === 0){ alert('Please enter Size'); return true;}
        return false;
    }

    const removeAlert = () => {
        let j = 0, k = 0;
        for(let i = 0; i <= 5; i++){
            const value = document.getElementById(`removeInput${i}`).value;
            if(i % 2 === 0){ removeC[j++] = value; }
            if(i % 2 != 0){ removeDi[k++] = value; }
            if(value.length === 0){ alert('Please input every fields.'); return true;}
        }
        return false;
    }

    const onIntroCalculation = () => {
        const introForm = document.getElementById('intro-form');
        const art = { req: 0, des: 1, cod: 2 };
        let A = [], B = [], defects = [1, 1, 1], Size, totalDefect = 0.0;
        const req = document.getElementById('introReqUni');
        const reqLang = document.getElementById('introReqLang');

        if( !introAlert() ){ 
            A[art.req] = introForm.introReqA.value;
            A[art.des] = introForm.introDesA.value;
            A[art.cod] = introForm.introCodA.value;
            B[art.req] = introForm.introReqB.value;
            B[art.des] = introForm.introDesB.value;
            B[art.cod] = introForm.introCodB.value;
            Size = (req.value === 'KLOC') ? introForm.introReqSize.value : ((reqLang.value * introForm.introReqSize.value)/1000) ;
    
            for(let i = 0; i <= 21; i++){
                const req = $(`input[name="req${introDriver[i]}"]:checked`).val();
                const des = $(`input[name="design${introDriver[i]}"]:checked`).val();
                const cod = $(`input[name="coding${introDriver[i]}"]:checked`).val();
                defects[art.req] *= req;
                defects[art.des] *= des;
                defects[art.cod] *= cod;
            }

            for(let i = 0; i <=2; i++){
                defects[i] *= A[i] * Math.pow(Size, B[i]);
                totalDefect += defects[i];
                document.getElementById(`introResult${i}`).innerHTML = parseFloat(defects[i]).toFixed(2);
            }
            document.getElementById('totalDefectIntro').innerHTML = parseFloat(totalDefect).toFixed(2);

            $('.intro-table').show(1000);
        }
    }


    const onRemoveCalculation = () => {
        let driver = [], product = [1, 1, 1], totalResult = 0.0;
        if( !removeAlert() ){
            for(let i = 0; i <= 8; i++){
                driver[i] = $(`input[name="removeDrf${i}"]:checked`).val();
                document.getElementById(`removeDriverResult${i}`).innerHTML = parseFloat(driver[i]).toFixed(2);
                if(i <= 2){ product[0] *= 1 - driver[i]; }
                if(i > 2 && i <= 5){ product[1] *= 1 - driver[i]; }
                if(i > 5 && i <= 8){ product[2] *= 1 - driver[i]; }
            }
            for(let i = 0; i <= 2; i++){
                document.getElementById(`removeProduct${i}`).innerHTML = parseFloat(product[i]).toFixed(2);
                document.getElementById(`removeDI${i}`).innerHTML = parseFloat(removeDi[i]).toFixed(2);
                const dres = removeC[i] * removeDi[i] * product[i];
                totalResult += dres;
                document.getElementById(`removeDRes${i}`).innerHTML = parseFloat(dres).toFixed(2);
            }
            document.getElementById(`removeTotal`).innerHTML = parseFloat(totalResult).toFixed(2);
            $('.remove-table').show(1000);
        } 
    }

    const introDriverDisplay = () => {
        $('input[name="introDriverMode"]').on('change', () => {
            const value = $('input[name="introDriverMode"]:checked').val();
            switch( value ){
                case 'requirements': {
                    $('.intro-driver-left').slideDown(1000);
                    $('.intro-driver-right').hide();
                    $('.intro-driver-center').hide();
                    break;
                }
                case 'design': {
                    $('.intro-driver-left').hide();
                    $('.intro-driver-right').hide();
                    $('.intro-driver-center').slideDown(1000);
                    break;
                }
                case 'coding': {
                    $('.intro-driver-left').hide();
                    $('.intro-driver-right').slideDown(1000);
                    $('.intro-driver-center').hide();
                    break;
                }
                default: break;
            }
        })
    }
    const formDisplayChoice = () =>{
        $('input[name="mode"]').on('change', () => {
            const value = $('input[name="mode"]:checked').val();
            switch( value ){
                case 'intro': {
                    $('.left-block').slideDown(1000);
                    $('.right-block').hide();
                    functionPoint();
                    referenceSize();
                    introDriverDisplay();
                    break;
                }
                case 'remove': {
                    $('.left-block').hide();
                    $('.right-block').slideDown(1000);
                    break;
                }
                default: break;
            }
        })
    }

    const onIntroSubmit = () => { event.preventDefault(); }
    const onRemoveSubmit = () => { event.preventDefault(); }

    const setupListeners = () => {
        $('#intro-form').on('submit', onIntroSubmit);
        $('#remove-form').on('submit', onRemoveSubmit);

        $('#intro-calculate').on('click', onIntroCalculation);
        $('#remove-calculate').on('click', onRemoveCalculation);

        functionPoint();
        referenceSize();
        formDisplayChoice();
        introDriverDisplay();
    }

    const run = () => {
        $('.right-block').hide();
        
        $('.intro-driver-right').hide();
        $('.intro-driver-center').hide();

        $('.intro-table').hide();
        $('.remove-table').hide();

        setupListeners();
    }
    run();
})();