<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ImageController extends Controller
{
    public function uploadToImgbb(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // Tamanho máximo de 5MB
        ]);

        $image = $request->file('image');
        $imageData = base64_encode(file_get_contents($image));

        $apiKey = env('IMGBB_API_KEY');
        $response = Http::post('https://api.imgbb.com/1/upload', [
            'key' => $apiKey,
            'image' => $imageData,
        ]);

        if ($response->successful()) {
            return response()->json($response->json(), 200);
        }

        return response()->json(['error' => 'Erro ao fazer upload da imagem'], 500);
    }
}
