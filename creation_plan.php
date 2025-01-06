<!DOCTYPE html>
<style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    form {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 300px;
    }
    label {
        font-weight: bold;
        margin-top: 10px;
        display: block;
    }
    input[type="text"] {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    input[type="radio"] {
        margin-right: 5px;
    }
    button {
        background-color: #4CAF50;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
    }
    button[type="reset"] {
        background-color: #f44336;
    }
    button:hover {
        opacity: 0.8;
    }
</style>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Création Plan</title>
</head>
<body>
    <form action="submit_plan.php" method="post">
        <label for="type">Type de propriété :</label>
        <input type="radio" id="appartement" name="type" value="Appartement">
        <label for="appartement">Appartement</label><br>
        <input type="radio" id="maison_ville" name="type" value="Maison Ville">
        <label for="maison_ville">Maison Ville</label><br>
        <input type="radio" id="villa" name="type" value="Villa">
        <label for="villa">Villa</label><br>
        <input type="radio" id="commerce" name="type" value="Commerce">
        <label for="commerce">Commerce</label><br><br>
        

        <label for="etage">Étage :</label>
        <input type="text" id="etage" name="etage"><br><br>

        <label for="nb_etage">Nombre d'étages :</label>
        <input type="text" id="nb_etage" name="nb_etage"><br><br>

        <label for="Personnes">Situation :</label><br>
        <input type="radio" id="PersonneSeul" name="Personnes" value="Villa">
        <label for="PersonneSeul">Personne Seul</label><br>
        <input type="radio" id="Famille" name="Personnes" value="Famille">
        <label for="Famille">Famille</label><br><br>

        <label for="nb_animaux">Nombre d'animaux :</label>
        <input type="text" id="nb_animaux" name="nb_animaux"><br><br>

        <button type="reset">Annuler</button>
        <button type="submit">Enregistrer</button>
    </form>
</body>
</html>