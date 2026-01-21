export const sendWhatsAppRequest = (requestData: {
  serviceName: string;
  category: string;
  option?: string;
  date?: string;
  duration?: string;
  location?: string;
  customerName: string;
  phone: string;
  email?: string;
  notes?: string;
}) => {
  const adminWhatsAppNumber = '+2348123456789'; // Replace with actual admin WhatsApp number
  
  const message = `📦 New Service Request from Pearlfountain Events Centre Website

Service Selected: ${requestData.serviceName}
Category: ${requestData.category}
${requestData.option ? `Option/Size Chosen: ${requestData.option}` : ''}
${requestData.date ? `Date Needed: ${requestData.date}` : ''}
${requestData.duration ? `Duration: ${requestData.duration}` : ''}
${requestData.location ? `Location: ${requestData.location}` : ''}

Customer Name: ${requestData.customerName}
Phone Number: ${requestData.phone}
${requestData.email ? `Email: ${requestData.email}` : ''}

${requestData.notes ? `📝 Additional Notes: ${requestData.notes}` : ''}

⚡ Action: Kindly follow up with the client to confirm details and payment.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${adminWhatsAppNumber.replace('+', '')}?text=${encodedMessage}`;
  
  window.open(whatsappUrl, '_blank');
};

export const formatWhatsAppNumber = (number: string): string => {
  // Remove any non-digit characters
  const cleaned = number.replace(/\D/g, '');
  
  // Add country code if not present
  if (cleaned.startsWith('0')) {
    return '+234' + cleaned.substring(1);
  } else if (cleaned.startsWith('234')) {
    return '+' + cleaned;
  } else if (!cleaned.startsWith('+')) {
    return '+234' + cleaned;
  }
  
  return cleaned;
};