const formSubmit = document.getElementById('loan-form')

loadAllEvent()

function loadAllEvent(){
    //event handler on submit
    formSubmit.addEventListener('submit', function(e){
        document.getElementById('results').style.display = 'none'

        document.getElementById('loading').style.display = 'block'

        setTimeout(calcu, 2000)
        e.preventDefault()
    })
}



function calcu(){
    const amount = document.getElementById('amount')
    const interest = document.getElementById('interest')
    const years = document.getElementById('years')

    const monthlyPayment = document.getElementById('monthly-payment')
    const totalPayment = document.getElementById('total-payment')
    const totalInterest = document.getElementById('total-interest')

    const principal = parseFloat(amount.value)
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12

    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments)
    const monthly = (principal * x * calculatedInterest) / (x-1)

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2)
        totalPayment.value = (monthly*calculatedPayments).toFixed(2)
        totalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2)

        document.getElementById('results').style.display = 'block'

        document.getElementById('loading').style.display = 'none'
    } else {
        showError('Check your Numbers')
    }
    

    
}

function showError(error){
    document.getElementById('results').style.display = 'none'

    document.getElementById('loading').style.display = 'none'
    
    const errorDiv = document.createElement('div');
    errorDiv.className='alert alert-danger'

    //get Element for display
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')

    errorDiv.appendChild(document.createTextNode(error))

    //insert error
    card.insertBefore(errorDiv, heading)

    //clear error
    setTimeout(clearError, 3000)
    
}

function clearError(){
    document.querySelector('.alert').remove();
}