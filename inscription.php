<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f0f0;
        }
        .register-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .register-container h2 {
            margin-bottom: 20px;
        }
        .register-container input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .register-container button {
            width: 100%;
            padding: 10px;
            background-color: #007BFF;
            border: none;
            color: #fff;
            border-radius: 5px;
            cursor: pointer;
        }
        .register-container button:hover {
            background-color: #0056b3;
        }
        .register-container .login-link {
            margin-top: 10px;
            display: block;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="register-container">
        <h2>Inscription</h2>
        <form action="register.php" method="post">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" required><br><br>
            
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required><br><br>
            
            <button type="submit">S'inscrire</button>
        </form>
        <a class="login-link" href="connexion.php">Déjà inscrit ? Connectez-vous ici</a>
    </div>
</body>
</html>