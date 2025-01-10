import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'capacitor-razorpay';
import { Plugins } from '@capacitor/core';
const { Checkout } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  pageTitle: any;
  constructor(
    
  ) { }

  async makePayment(paymentData : any) {
    const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        description: paymentData.description,
        image: paymentData.logo,
        currency: paymentData.currency,
        order_id :paymentData.order_id,
        name: paymentData.name,
        prefill: {
          email: paymentData.userData.email,
          contact: paymentData.userData.number,
          name: paymentData.userData.name
        },
        theme: {
          color: '#007D9E'
        }
      }
      try {
        let data = (await Checkout['open'](options));
        console.log(data);
        if (data.response.razorpay_payment_id) {
          console.log('Transaction Success');
            return {response : data.response,status : true,message : 'Transcation success'};
          //this.toastService.showSuccess("success", "Transcation success")
        } else {
            return {response : data.response,status : false,message : 'Transcation failed'};
        }
      } catch (error : any) {
        let errorData = JSON.parse(error);
        console.log('RAZORPAY ERROR-----'+JSON.stringify(errorData));
        return {response : '',status : false, message : errorData.description};
      }
  }

  



}
