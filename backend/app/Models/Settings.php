<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
     /**
     * @var string $table
     */
    protected $table = 'user_settings';

    /**
     * @var array $fillable
     */
    protected $fillable = [
        'user_id',
        'authors',
        'sources'
    ];
    use HasFactory;
}