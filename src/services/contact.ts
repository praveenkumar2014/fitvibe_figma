import { ContactDetails } from '../types/contact';
import { ApiError } from './api';
import { environment } from '../config/environment';

export async function submitContactDetails(data: ContactDetails): Promise<void> {
  try {
    // Create form data for GHL
    const formData = new FormData();
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('business_name', data.businessName || ''); // Send empty string if no business name
    formData.append('form_id', environment.ghl.formId);
    formData.append('full_name', `${data.firstName} ${data.lastName}`.trim());

    const response = await fetch(environment.ghl.apiUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.message || 'Form submission failed',
        response.status
      );
    }
  } catch (error) {
    console.error('Error submitting contact details:', error);
    throw error instanceof ApiError ? error : new ApiError('Network error occurred');
  }
}