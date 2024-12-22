document.addEventListener('DOMContentLoaded', function() {
    function saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    function getData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    let currentUser = localStorage.getItem('currentUser') || 'Vic';
    document.getElementById('userSelect').value = currentUser;

    document.getElementById('userSelect').addEventListener('change', function(e) {
        currentUser = e.target.value;
        localStorage.setItem('currentUser', currentUser);
    });

    function displayMessages() {
        const messages = getData('messages');
        const messageListContainer = document.getElementById('messageList');
        messageListContainer.innerHTML = '';
        messages.forEach((message) => {
            const li = document.createElement('li');
            li.textContent = `${message.user}: ${message.text}`;
            messageListContainer.appendChild(li);
        });
    }

    function displayRules() {
        const rules = getData('rules');
        const ruleListContainer = document.getElementById('ruleList');
        ruleListContainer.innerHTML = '';
        rules.forEach((rule, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${rule.description} (${rule.user})`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                deleteRule(index);
            });
            li.appendChild(deleteBtn);
            ruleListContainer.appendChild(li);
        });
    }

    function deleteRule(index) {
        const rules = getData('rules');
        rules.splice(index, 1);
        saveData('rules', rules);
        displayRules();
    }

    function displayNicknames() {
        const nicknames = getData('nicknames');
        const nicknameListContainer = document.getElementById('nicknameList');
        nicknameListContainer.innerHTML = '';
        nicknames.forEach((nickname, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${nickname.nickname} (${nickname.user})`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                deleteNickname(index);
            });
            li.appendChild(deleteBtn);
            nicknameListContainer.appendChild(li);
        });
    }

    function deleteNickname(index) {
        const nicknames = getData('nicknames');
        nicknames.splice(index, 1);
        saveData('nicknames', nicknames);
        displayNicknames();
    }

    function displayPhotos() {
        const photos = getData('photos');
        const photosContainer = document.getElementById('photosContainer');
        photosContainer.innerHTML = '';
        photos.forEach((photo, index) => {
            const div = document.createElement('div');
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.name;
            div.appendChild(img);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Excluir Foto';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                deletePhoto(index);
            });

            div.appendChild(deleteBtn);
            photosContainer.appendChild(div);
        });
    }

    function deletePhoto(index) {
        const photos = getData('photos');
        photos.splice(index, 1);
        saveData('photos', photos);
        displayPhotos();
    }

    document.getElementById('photoForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const photoInput = document.getElementById('photoInput');
        const photoFile = photoInput.files[0];

        if (photoFile) {
            const photoData = getData('photos');
            const photoName = `${currentUser}: ${photoFile.name}`;

            photoData.push({ name: photoName, src: URL.createObjectURL(photoFile) });
            saveData('photos', photoData);
            photoInput.value = '';
        }
    });

    document.getElementById('messageForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const messageInput = document.getElementById('messageInput');
        const messageText = messageInput.value;

        if (messageText) {
            const messages = getData('messages');
            messages.push({ user: currentUser, text: messageText });
            saveData('messages', messages);
            messageInput.value = '';
            displayMessages();
        }
    });

    document.getElementById('clearMessages')?.addEventListener('click', function() {
        saveData('messages', []);
        displayMessages();
    });

    document.getElementById('ruleForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const ruleDescription = document.getElementById('ruleInput').value;

        if (ruleDescription) {
            const rules = getData('rules');
            rules.push({ description: ruleDescription, user: currentUser });
            saveData('rules', rules);
            document.getElementById('ruleInput').value = '';
            displayRules();
        }
    });

    document.getElementById('nicknameForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const nicknameInput = document.getElementById('nicknameInput').value;

        if (nicknameInput) {
            const nicknames = getData('nicknames');
            nicknames.push({ nickname: nicknameInput, user: currentUser });
            saveData('nicknames', nicknames);
            document.getElementById('nicknameInput').value = '';
            displayNicknames();
        }
    });

    displayMessages();
    displayRules();
    displayNicknames();
    displayPhotos();
});
