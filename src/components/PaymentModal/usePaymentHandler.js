//import stateModalPayment from "@/src/state/stateModalPayment";
//"use client";
//import stateModalPayment from "@/src/state/stateModalPayment";

// !! Логіка запиту на старий бекенд на отримання посилання сторінки оплати. !!
const urlBase = 'https://baza-trainee-landing.vercel.app/api/v1';



function usePaymentHandler(payment, locale, startLoader,stoptLoader,addError,addThanks){
	const paymentAmount = payment === "123" ? '0' : payment;
  // const startLoader = stateModalPayment(state => state.startLoader);
	// const stoptLoader = stateModalPayment(state => state.stoptLoader);

	const paymentData = {
		transactionType: 'CREATE_INVOICE',
		merchantDomainName: window.location.hostname,
		apiVersion: 1,
		orderReference: Date.now().toString(),
		orderDate: Date.now(),// дата.
		amount: Number(paymentAmount), // сума.
		language: locale, // мова сторінки оплати.
		currency: 'UAH',// валюта.
		productName: ['Baza trainee support'],// наза товару.
		productCount: [1], // кількість товару.
		productPrice: [Number(paymentAmount)], // ціна за одиницю товару.
		serviceUrl: 'https://baza-trainee.tech/api/v1/payment/complete',
	};

	const handlePayment = async () => {

		if (Number(paymentAmount)) {
			try {
				startLoader()
				const response = await fetch(`${urlBase}/payment`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json;charset=utf-8'
					},
					body: JSON.stringify(paymentData)
				});

				const checkoutUrl = await response.json();
				if (checkoutUrl.invoiceUrl) {
					window.location.href = checkoutUrl.invoiceUrl;
					
					addThanks()
				}
				
			} catch (error) {
				setErrorMessage('Error occurred while processing payment');
				console.error(error);
				addError()
			} finally {stoptLoader()}
		} else {
			//setErrorMessage('Please enter a valid payment amount');
			stoptLoader()
			addError()
		}
		//stoptLoader()
	};
	// Розкоментувати щоб побачити перехід на сторінку оплати.
	// !!! Обержно платежі справжні !!!
	handlePayment()

	return paymentData
};

export default usePaymentHandler;