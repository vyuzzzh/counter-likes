const registration = document.formReg;
const login = document.formLogin;
const { createAuction } = document;
console.log(createAuction);

if (registration) {
  registration.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const {
      action, method,
    } = event.target;

    fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, email, password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.state) {
          window.location = '/';
          return true;
        }
        const divError = document.querySelector('.err');
        divError.innerText = json.answ;
      })
      .catch(() => window.alert('Ooops... Something went wrong.'));
  });
}

if (login) {

  login.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('faesfsa');

    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email, password);

    const {
      action, method,
    } = event.target;

    fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, password,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.state) {
          window.location = '/';
          return true;
        }
        const divError = document.querySelector('.err');
        divError.innerText = json.answ;
      })
      .catch(() => window.alert('Ooops... Something went wrong.'));
  });
}

if (createAuction) {
  createAuction.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const description = event.target.description.value;
    const dateStart = event.target.dateStart.value;
    const timeStart = event.target.timeStart.value;
    const dateEnd = event.target.dateEnd.value;
    const timeEnd = event.target.timeEnd.value;

    const start = `${timeStart} ${dateStart}`;
    const end = `${timeEnd} ${dateEnd}`;
    const {
      action, method,
    } = event.target;

    fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title, description, start, end,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.state) {
          window.location = '/personal';
          return true;
        }
        const divError = document.querySelector('.err');
        divError.innerText = json.answ;
      })
      .catch(() => window.alert('Ooops... Something went wrong.'));
  });
}
