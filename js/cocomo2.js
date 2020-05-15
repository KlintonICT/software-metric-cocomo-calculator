(() => {
    const appAlert = ( objectPoint, reuse, prod ) => { 
        if(objectPoint.length === 0){ alert('Please enter ObjectPoints'); return true;}
        if(reuse.reuse === 0){ alert('Please enter %Reuse'); return true;}
        if(prod.length === 0){ alert('Please enter PROD'); return true;}
        return false;
    }

    const earlyAlert = () => { 
        const earlyForm = document.getElementById('early-form');
        if(earlyForm.earlyAsloc.value.length  === 0){ alert('Please enter ASLOC'); return true;}
        if(earlyForm.earlyAt.value.length     === 0){ alert('Please enter AT'); return true;}
        if(earlyForm.earlyAtprod.value.length === 0){ alert('Please enter ATPROD'); return true;}
        if(earlyForm.earlyAj.value.length     === 0){ alert('Please enter AJ'); return true;}
        if(earlyForm.earlyBrak.value.length   === 0){ alert('Please enter BRAK'); return true;}
        if(earlyForm.earlyKnsloc.value.length === 0){ alert('Please enter KNSLOC'); return true;}
        if(earlyForm.earlyKasloc.value.length === 0){ alert('Please enter KASLOC'); return true;}
        if(earlyForm.earlyAa.value.length     === 0){ alert('Please enter AA'); return true;}
        if(earlyForm.earlySu.value.length     === 0){ alert('Please enter SU'); return true;} 
        if(earlyForm.earlyUnfm.value.length   === 0){ alert('Please enter UNFM'); return true;}
        if(earlyForm.earlyDm.value.length     === 0){ alert('Please enter DM'); return true;}
        if(earlyForm.earlyCm.value.length     === 0){ alert('Please enter CM'); return true;}
        if(earlyForm.earlyIm.value.length     === 0){ alert('Please enter IM'); return true;}
        return false;
    }

    const postAlert = () => { 
        const postForm = document.getElementById('post-form');
        if(postForm.postAsloc.value.length  === 0){ alert('Please enter ASLOC'); return true;}
        if(postForm.postAt.value.length     === 0){ alert('Please enter AT'); return true;}
        if(postForm.postAtprod.value.length === 0){ alert('Please enter ATPROD'); return true;}
        if(postForm.postAj.value.length     === 0){ alert('Please enter AJ'); return true;}
        if(postForm.postBrak.value.length   === 0){ alert('Please enter BRAK'); return true;}
        if(postForm.postKnsloc.value.length === 0){ alert('Please enter KNSLOC'); return true;}
        if(postForm.postKasloc.value.length === 0){ alert('Please enter KASLOC'); return true;}
        if(postForm.postAa.value.length     === 0){ alert('Please enter AA'); return true;}
        if(postForm.postSu.value.length     === 0){ alert('Please enter SU'); return true;} 
        if(postForm.postUnfm.value.length   === 0){ alert('Please enter UNFM'); return true;}
        if(postForm.postDm.value.length     === 0){ alert('Please enter DM'); return true;}
        if(postForm.postCm.value.length     === 0){ alert('Please enter CM'); return true;}
        if(postForm.postIm.value.length     === 0){ alert('Please enter IM'); return true;}
        return false;
    }

    const onAppCalculation = () => { 
        const formElem  = document.getElementById('app-form');
        const prodValue = document.getElementById('prod').value;
        const objectPoint = formElem.objectPoint.value;
        const reuse       = formElem.reuse.value;

        let alert = appAlert(objectPoint, reuse, prod);

        if( !alert ){
            const nop = ( objectPoint - (100 - reuse) ) / 100;
            const pm  = nop / prodValue;
            document.getElementById('nop-value').innerHTML = `&nbsp${parseFloat(nop).toFixed(2)}`;
            document.getElementById('pm-value').innerHTML  = `&nbsp${parseFloat(pm).toFixed(2)}`;
        }
    }

    const onEarlyCalculation = () => {
        const earlyForm = document.getElementById('early-form');
        const ASLOC  = earlyForm.earlyAsloc.value;
        const AT     = earlyForm.earlyAt.value;
        const ATPROD = earlyForm.earlyAtprod.value;
        const AJ     = earlyForm.earlyAj.value;
        const BRAK   = earlyForm.earlyBrak.value;
        const KNSLOC = earlyForm.earlyKnsloc.value;
        const KASLOC = earlyForm.earlyKasloc.value;
        const AA     = earlyForm.earlyAa.value;
        const SU     = earlyForm.earlySu.value;
        const UNFM   = earlyForm.earlyUnfm.value;
        const DM     = earlyForm.earlyDm.value;
        const CM     = earlyForm.earlyCm.value;
        const IM     = earlyForm.earlyIm.value;
        let EM = [];
        let SF = [];

        for(let i = 0; i <= 6; i++) { EM[i] = document.getElementById(`earlyEm${i}`).value; }
        for(let i = 0; i <= 4; i++) { SF[i] = document.getElementById(`earlySf${i}`).value; }

        if( !earlyAlert() ){
            const AAF   = (0.4 * DM) + (0.3 * CM) + (0.3 * IM);
            const AAM   = ( AAF <= 50 ) ? ((AA + AAF * (1 + (0.02 * SU * UNFM))) / 100) : ((AA + AAF + (SU * UNFM))/100);
            const Size  = KNSLOC + KASLOC * ((100 - AJ) / 100) * AAM;
            const SizeP = Size * (1 + (BRAK / 100));
            const PMm   = (ASLOC * (AT / 100)) / ATPROD;
            let B;
            let PM;
            let sumSF = 0.0;
            let mulEm = 1.0;

            for(let i = 0; i <= 4; i++){ sumSF += parseFloat(SF[i]); }
            for(let i = 0; i <= 6; i++){ mulEm *= parseFloat(EM[i]); }
            
            B  = 1.01 + 0.01 * parseFloat(sumSF);
            PM = 2.5 * Math.pow(SizeP, B) * mulEm + PMm;
            
            document.getElementById('earlyAaf').innerHTML = AAF;
            document.getElementById('earlyAam').innerHTML = parseFloat(AAM).toFixed(2);
            document.getElementById('earlySize').innerHTML = parseFloat(Size).toFixed(2);
            document.getElementById('earlySizeP').innerHTML = parseFloat(SizeP).toFixed(2);
            document.getElementById('earlyB').innerHTML = parseFloat(B).toFixed(2);
            document.getElementById('earlyProductEm').innerHTML = parseFloat(mulEm).toFixed(2);
            document.getElementById('earlyPmm').innerHTML = parseFloat(PMm).toFixed(2);
            document.getElementById('earlyPm').innerHTML = parseFloat(PM).toFixed(2);

            $('.early-table').slideDown(1000);
            $('.early-note').slideDown(1000);
        }
    }

    const onPostCalculation = () => { 
        const postForm = document.getElementById('post-form');
        const ASLOC  = postForm.postAsloc.value;
        const AT     = postForm.postAt.value;
        const ATPROD = postForm.postAtprod.value;
        const AJ     = postForm.postAj.value;
        const BRAK   = postForm.postBrak.value;
        const KNSLOC = postForm.postKnsloc.value;
        const KASLOC = postForm.postKasloc.value;
        const AA     = postForm.postAa.value;
        const SU     = postForm.postSu.value;
        const UNFM   = postForm.postUnfm.value;
        const DM     = postForm.postDm.value;
        const CM     = postForm.postCm.value;
        const IM     = postForm.postIm.value;
        let EM = [];
        let SF = [];

        for(let i = 0; i <= 16; i++) { EM[i] = document.getElementById(`postEm${i}`).value; }
        for(let i = 0; i <= 4; i++) { SF[i] = document.getElementById(`postSf${i}`).value; }

        if( !postAlert() ){
            const AAF   = (0.4 * DM) + (0.3 * CM) + (0.3 * IM);
            const AAM   = ( AAF <= 50 ) ? ((AA + AAF * (1 + (0.02 * SU * UNFM))) / 100) : ((AA + AAF + (SU * UNFM))/100);
            const Size  = KNSLOC + KASLOC * ((100 - AJ) / 100) * AAM;
            const SizeP = Size * (1 + (BRAK / 100));
            const PMm   = (ASLOC * (AT / 100)) / ATPROD;
            let B;
            let PM;
            let sumSF = 0.0;
            let mulEm = 1.0;

            for(let i = 0; i <= 4; i++){ sumSF += parseFloat(SF[i]); }
            for(let i = 0; i <= 16; i++){ mulEm *= parseFloat(EM[i]); }
            
            B  = 1.01 + 0.01 * sumSF;
            PM = 2.5 * Math.pow(SizeP, B) * mulEm + PMm;
            
            document.getElementById('postAaf').innerHTML = parseFloat(AAF).toFixed(2);
            document.getElementById('postAam').innerHTML = parseFloat(AAM).toFixed(2);
            document.getElementById('postSize').innerHTML = parseFloat(Size).toFixed(2);
            document.getElementById('postSizeP').innerHTML = parseFloat(SizeP).toFixed(2);
            document.getElementById('postB').innerHTML = parseFloat(B).toFixed(2);
            document.getElementById('postProductEM').innerHTML = parseFloat(mulEm).toFixed(2);
            document.getElementById('postPmm').innerHTML = parseFloat(PMm).toFixed(2);
            document.getElementById('postPm').innerHTML = parseFloat(PM).toFixed(2);

            $('.post-table').slideDown(1000);
            $('.post-note').slideDown(1000);
        }
    }

    const formDisplayChoice = () => { 
        $('input[name="mode"]').on('change', () => {
            const value = $('input[name="mode"]:checked').val();
            switch( value ){
                case 'app': {
                    $('.left-block').slideDown(1000);
                    $('.right-block').hide();
                    $('.center-block').hide();
                    break;
                }
                case 'early': {
                    $('.left-block').hide();
                    $('.right-block').hide();
                    $('.center-block').show(1000);
                    break;
                }
                case 'post': {
                    $('.left-block').hide();
                    $('.right-block').slideDown(1000);
                    $('.center-block').hide();
                    break;
                }
                default: break;
            }
        })
    }

    const onSubmitApp   = ( event ) => { event.preventDefault(); }
    const onSubmitEarly = ( event ) => { event.preventDefault(); }
    const onSubmitPost  = ( event ) => { event.preventDefault(); } 
    
    const setupListener = () => {
       $('#app-form').on('submit', onSubmitApp);
       $('#early-form').on('submit', onSubmitEarly);
       $('#post-form').on('submit', onSubmitPost);

       $('#app-calculate').on('click', onAppCalculation);
       $('#early-calculate').on('click', onEarlyCalculation);
       $('#post-calculate').on('click', onPostCalculation);

       formDisplayChoice();
    }

    const run = () => {
        $('.right-block').hide();
        $('.center-block').hide();

        $('.early-table').hide();
        $('.post-table').hide();

        $('.early-note').hide();
        $('.post-note').hide();
        
        setupListener();
    }
    run();
})();