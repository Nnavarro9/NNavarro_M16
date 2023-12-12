document.getElementById('generateAvatar').addEventListener('click', function () {
    const avatarColor = document.getElementById('avatarColor').value;
    const avatarImage = document.getElementById('avatarImage').value;

    // Guardar la información en las cookies
    document.cookie = `avatarColor=${avatarColor}`;
    document.cookie = `avatarImage=${avatarImage}`;

    const result = document.getElementById('result');
    result.style.backgroundColor = avatarColor;

    if (avatarImage) {
        result.style.backgroundImage = `url(${avatarImage})`;
    } else {
        result.style.backgroundImage = 'none';
    }
});