const API = 'https://web1-api.vercel.app/api';

async function loadData(request, templateId, viewId) {
    const response = await fetch(`${API}/${request}`);
    const data = await response.json();
    var source = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var context = { data: data };
    var view = document.getElementById(viewId);
    view.innerHTML = template(context);
}



const AUTHENTICATE_API = 'your_authenticate_api_url';

async function getAuthenticateToken(username, password) {
    try {
        const response = await fetch(`${AUTHENTICATE_API}/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 200) {
            const result = await response.json();
            return result.token;
        } else {
            throw new Error('Failed to authenticate. Please check your credentials.');
        }
    } catch (error) {
        throw new Error('Failed to authenticate. Please try again later.');
    }
}

async function login(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    document.getElementById('errorMessage').innerText = '';

    try {
        const token = await getAuthenticateToken(username, password);
        if (token) {
            localStorage.setItem('token', token);
            closeLoginModal();
            displayControls();
        }
    } catch (error) {
        document.getElementById('errorMessage').innerText = error.message;
        displayControls(false);
    }
}

function displayControls(isLoggedIn = true) {
    const linkLogins = document.querySelectorAll('.linkLogin');
    const linkLogouts = document.querySelectorAll('.linkLogout');
    const leaveComment = document.getElementById('leave-comment');

    const displayLogin = isLoggedIn ? 'none' : 'block';
    const displayLogout = isLoggedIn ? 'block' : 'none';

    linkLogins.forEach(link => link.style.display = displayLogin);
    linkLogouts.forEach(link => link.style.display = displayLogout);

    if (leaveComment) {
        leaveComment.style.display = displayLogout;
    }
}

async function checkLogin() {
    const isLoggedIn = await verifyToken();
    displayControls(isLoggedIn);
}

async function verifyToken() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const response = await fetch(`${AUTHENTICATE_API}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
    return false;
}

function logout() {
    localStorage.removeItem('token');
    displayControls(false);
}

function closeLoginModal() {
    document.querySelector('.btn-close').click();
}






function login(event) {
    event.preventDefault();
    
   
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    
    if (username === 'admin' && password === 'admin') {
     
        document.getElementById('loggedInUsername').innerText = username;
        document.getElementById('loggedInContent').style.display = 'block';
        document.getElementById('loginFormContent').style.display = 'none';
    } else {
        document.getElementById('errorMessage').innerText = 'Invalid username or password.';
    }
}


function logout() {
   
    document.getElementById('loggedInContent').style.display = 'none';
    document.getElementById('loginFormContent').style.display = 'block';
}