const form = {
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    submit: document.getElementById('btn-submit'),
    messages: document.getElementById('form-messages'),
};

form.submit.addEventListener('click', (e) => {
    e.preventDefault();

    const request = new XMLHttpRequest();

    request.onload = () => {
        let responseObject = null;

        try {
            responseObject = JSON.parse(request.responseText);
        } catch (e) {
            console.error("Could not parse JSON!");
        }

        if(responseObject) {
            handleResponse(responseObject);
        }
    };

    const requestData = `username=${form.username.value}&password=${form.password.value}`;
    console.log(requestData);

    request.open('post', 'check-login.php');
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(requestData);
});


function handleResponse(responseObject) {
    function createAlertMsg(alertType) {
        while(form.messages.firstChild) {
            form.messages.removeChild(form.messages.firstChild);
        }

        responseObject.messages.forEach((message) => {
            const div = document.createElement('div');
            const li = document.createElement('li');
            li.textContent = message;
            div.appendChild(li);
            div.classList.add("alert");
            div.classList.add(`alert-${alertType}`);
            div.style.marginLeft = "-2.5rem";
            form.messages.appendChild(div);
        });

        form.messages.style.display = "block";
    }


    if(responseObject.ok) {
        /*
        while(form.messages.firstChild) {
            form.messages.removeChild(form.messages.firstChild);
        }
        */

        //location.href = 'dashboard.html';

        //// TODO: add setTimeout() later, to show success message and then change location

        createAlertMsg("success");

        /*
        responseObject.messages.forEach((message) => {
            const div = document.createElement('div');
            const li = document.createElement('li');
            li.textContent = message;
            div.appendChild(li);
            div.classList.add("alert");
            div.classList.add("alert-success");
            div.style.marginLeft = "-2.5rem";
            form.messages.appendChild(div);
        });

        form.messages.style.display = "block";
        */

        setTimeout(() => {
            //document.querySelector('.alert-success').remove();
            location.href = 'dashboard.html';
        }, 1450);

    } else {
        createAlertMsg("danger");

        /*
        while(form.messages.firstChild) {
            form.messages.removeChild(form.messages.firstChild);
        }

        responseObject.messages.forEach((message) => {
            const div = document.createElement('div');
            const li = document.createElement('li');
            li.textContent = message;
            div.appendChild(li);
            div.classList.add("alert");
            div.classList.add("alert-danger");
            div.style.marginLeft = "-2.5rem";
            form.messages.appendChild(div);
        });

        form.messages.style.display = "block";
        */
    }
}
