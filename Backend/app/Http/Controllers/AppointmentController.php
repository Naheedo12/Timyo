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
     * Annuler un rendez-vous (soft delete ou changement de statut)
     */
    public function destroy(Appointment $appointment)
    {
        // Vérifier que le rendez-vous appartient à l'utilisateur connecté
        if ($appointment->user_id !== auth()->id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        // Vérifier que le rendez-vous n'est pas déjà passé
        if ($appointment->date < now()->toDateString()) {
            return response()->json(['message' => 'Impossible d\'annuler un rendez-vous passé'], 400);
        }

        $appointment->delete();

        return response()->json(['message' => 'Rendez-vous annulé avec succès']);
    }
}
