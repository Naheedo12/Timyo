<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; 
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
        ];
    }

    /**
     * Messages d'erreur 
     */
    public function messages(): array
    {
        return [
            'date.required' => 'La date est obligatoire',
            'date.after_or_equal' => 'La date ne peut pas être dans le passé',
            'time.required' => 'L\'heure est obligatoire',
            'time.date_format' => 'L\'heure doit être au format HH:MM',
        ];
    }
}
