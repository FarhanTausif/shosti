import SSLCommerzPayment from 'sslcommerz-lts';
import dotenv from 'dotenv';

dotenv.config();

// SSLCommerz Payment Service
const store_id = process.env.STORE_ID; 
const store_passwd = process.env.STORE_PASS;  
const is_live = false;  

export const initiatePayment = async (sessionData) => {
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  const data = {
    total_amount: 2000,  
    currency: 'BDT',  
    tran_id: sessionData.tran_id,  // Unique transaction ID
    success_url: `${process.env.SERVER_URL}/success/${sessionData.sessionId}`,  // Redirect URL for success
    fail_url: `${process.env.SERVER_URL}/fail/${sessionData.sessionId}`,  // Redirect URL for failure
    cancel_url: `${process.env.SERVER_URL}/cancel/${sessionData.sessionId}`,  // Redirect URL for cancellation
    ipn_url: `${process.env.SERVER_URL}/ipn`,  // Instant Payment Notification (Optional)
    shipping_method: 'Courier',
    product_name: sessionData.product_name,
    product_category: sessionData.product_category,
    product_profile: 'general',
    cus_name: sessionData.cus_name,
    cus_email: sessionData.cus_email,
    cus_add1: sessionData.cus_address,
    cus_city: sessionData.cus_city,
    cus_state: sessionData.cus_state,
    cus_postcode: sessionData.cus_postcode,
    cus_country: sessionData.cus_country,
    cus_phone: sessionData.cus_phone,
    ship_name: sessionData.ship_name,
    ship_add1: sessionData.ship_address,
    ship_city: sessionData.ship_city,
    ship_state: sessionData.ship_state,
    ship_postcode: sessionData.ship_postcode,
    ship_country: sessionData.ship_country,
    redirect_url: sessionData.redirect_url,
  };

  try {
    const apiResponse = await sslcz.init(data);
    return apiResponse.GatewayPageURL;  // This will be the URL to redirect to SSLCommerz
  } catch (error) {
    throw new Error('Failed to initiate payment');
  }
};
