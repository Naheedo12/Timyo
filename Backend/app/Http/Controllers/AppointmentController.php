<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Requests\UpdateAppointmentRequest;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Lister les rendez-vous de l'utilisateur connecté
     */
    public function index()
    {
        // Temporaire: utiliser le premier utilisateur pour les tests
        $user = auth()->user() ?? \App\Models\User::first();
        
        if (!$user) {
            return response()->json([]);
        }
        
        $appointments = $user->appointments()->orderBy('date', 'asc')->get();
        
        return response()->json($appointments);
    }

    /**
     * Créer un nouveau rendez-vous
     */
    public function store(Request $request)
    {
        $user = auth()->user() ?? \App\Models\User::first();
        
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }

        $appointment = $user->appointments()->create([
            'date' => $request->date,
            'time' => $request->time,
            'status' => 'pending'
        ]);

        return response()->json($appointment, 201);
    }

    /**
     * Annuler un rendez-vous
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return response()->json(['message' => 'Rendez-vous annulé']);
    }

    /**
     * Admin: Lister tous les rendez-vous
     */
    public function adminIndex()
    {
        $appointments = Appointment::with('user')->orderBy('date', 'asc')->get();
        return response()->json($appointments);
    }

    /**
     * Admin: Changer le statut d'un rendez-vous
     */
    public function updateStatus(Request $request, Appointment $appointment)
    {
        $appointment->update(['status' => $request->status]);
        return response()->json($appointment);
    }
}
