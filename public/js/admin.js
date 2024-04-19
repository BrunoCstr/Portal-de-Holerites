const firebaseApp = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: "",
    storageBucket: ""
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebase.storage();


// Pegando a informação do usuário selecionado na página anterior.
const urlParams = new URLSearchParams(window.location.search);
const userSelected = urlParams.get('username')

// Escrevendo o texto de boas-vindas no header.
const divHeader = document.querySelector('.header-container');
const welcomeMsg = document.createElement('p');
welcomeMsg.innerText = 'Aqui estão os holerites de ' + userSelected + ' do ano de 2024 :)';
welcomeMsg.style.color = '#002794';
divHeader.appendChild(welcomeMsg);

// Verificação se o usuário é adm e utilizando dinamicamente a interface do usuário.
auth.onAuthStateChanged((user) => {
    if (user) {
        // Buscando o ID da subcoleção no Firebase Database do usuário autenticado pelo Auth.
        const usersCollectionRef = db.collection('users');
        const adminUsername = user.displayName;

        usersCollectionRef.where('name', '==', adminUsername).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const docID = doc.id;

                    // Acessando o documento do usuário.
                    const userDocRef = usersCollectionRef.doc(docID);

                    userDocRef.get()
                        .then((userDoc) => {
                            if (userDoc.exists) {
                                const admin = userDoc.data().admin;

                                // Verificando se o usuário puxado é admin, se sim criar o "Botão" de Admin.
                                if (admin === true) {
                                    const navigation = document.querySelector('.main-navigation');
                                    const newdiv = document.createElement('div');
                                    const anchor = document.createElement('a');
                                    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                                    const backgroundImg = document.createElement('img');

                                    newdiv.className = 'admin';
                                    anchor.id = 'text-admin';
                                    anchor.href = 'adminlist.html';
                                    anchor.innerText = 'ADMIN';
                                    anchor.style.color = '#002794';
                                    icon.id = 'img-admin';
                                    icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                                    icon.setAttribute('width', '16');
                                    icon.setAttribute('height', '16');
                                    icon.setAttribute('fill', '#002794');
                                    icon.classList.add('bi', 'bi-person-gear');
                                    icon.setAttribute('viewBox', '0 0 16 16');
                                    iconPath.setAttribute('d', 'M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0');
                                    backgroundImg.src = 'images/nav-select.png';
                                    backgroundImg.className = 'background-adm';

                                    icon.append(iconPath);
                                    newdiv.append(anchor, icon, backgroundImg);
                                    navigation.appendChild(newdiv);

                                    // Admin responsividade Mobile
                                    const sidebar = document.querySelector('.sidebar');
                                    const newdiv2 = document.createElement('div');
                                    const anchor2 = document.createElement('a');
                                    const icon2 = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                    const iconPath2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                                    newdiv2.className = 'admin2';
                                    anchor2.id = 'text-admin2';
                                    anchor2.href = 'adminlist.html';
                                    anchor2.innerText = 'ADMIN';
                                    icon2.id = 'img-admin2';
                                    icon2.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                                    icon2.setAttribute('width', '16');
                                    icon2.setAttribute('height', '16');
                                    icon2.setAttribute('fill', '#fff');
                                    icon2.classList.add('bi', 'bi-person-gear');
                                    icon2.setAttribute('viewBox', '0 0 16 16');
                                    iconPath2.setAttribute('d', 'M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0');

                                    icon2.append(iconPath2);
                                    newdiv2.append(icon2, anchor2);
                                    sidebar.appendChild(newdiv2);

                                    handleNewDiv(newdiv2);
                                }
                            }
                        })
                        .catch((error) => {
                            console.error('Erro ao obter documento da subcoleção:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Erro ao realizar a consulta:', error);
            });
    } else {
        window.location.href = 'restricted.html';
    }
});



// Função para deslogar do Firebase Authentication.
function logout() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.log(error);
        })
}



// Função para verificar e exibir o ícone de verificação
function checkAndDisplayVerificationIcon() {

    //============================================================================================

    // Referência para a pasta do mês de Janeiro
    const JaneiroRef = firebase.storage().ref(userSelected + '/Janeiro');

    // Listar todos os itens da pasta de Janeiro
    JaneiroRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-1');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Fevereiro
    const FevereiroRef = firebase.storage().ref(userSelected + '/Fevereiro');

    // Listar todos os itens da pasta de Fevereiro
    FevereiroRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-2');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Março
    const MarçoRef = firebase.storage().ref(userSelected + '/Março');

    // Listar todos os itens da pasta de Março
    MarçoRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-3');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Abril
    const AbrilRef = firebase.storage().ref(userSelected + '/Abril');

    // Listar todos os itens da pasta de Abril
    AbrilRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-4');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Maio
    const MaioRef = firebase.storage().ref(userSelected + '/Maio');

    // Listar todos os itens da pasta de Maio
    MaioRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-5');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Junho
    const JunhoRef = firebase.storage().ref(userSelected + '/Junho');

    // Listar todos os itens da pasta de Junho
    JunhoRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-6');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Julho
    const JulhoRef = firebase.storage().ref(userSelected + '/Julho');

    // Listar todos os itens da pasta de Julho
    JulhoRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-7');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Agosto
    const AgostoRef = firebase.storage().ref(userSelected + '/Agosto');

    // Listar todos os itens da pasta de Agosto
    AgostoRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-8');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Setembro
    const SetembroRef = firebase.storage().ref(userSelected + '/Setembro');

    // Listar todos os itens da pasta de Setembro
    SetembroRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-9');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Agosto
    const OutubroRef = firebase.storage().ref(userSelected + '/Outubro');

    // Listar todos os itens da pasta de Outubro
    OutubroRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-10');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Novembro
    const NovembroRef = firebase.storage().ref(userSelected + '/Novembro');

    // Listar todos os itens da pasta de Novembro
    NovembroRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-11');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do mês de Novembro
    const DezembroRef = firebase.storage().ref(userSelected + '/Dezembro');

    // Listar todos os itens da pasta de Dezembro
    DezembroRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-12');
            if (successIcon) {
                successIcon.style.display = 'inline';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });


    //============================================================================================

    // Referência para a pasta do IRRF
    const IRRFRef = firebase.storage().ref(userSelected + '/IRRF');

    // Listar todos os itens da pasta de IRRF
    IRRFRef.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-13');
            const irrfIcon = document.querySelector('.irrf')
            if (successIcon) {
                successIcon.style.display = 'inline';
                irrfIcon.id = 'irrf-adm-2';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do Decimo Terceiro
    const DecimoTerceiro1Ref = firebase.storage().ref(userSelected + '/DecimoTerceiro1');

    // Listar todos os itens da pasta DecimoTerceiro
    DecimoTerceiro1Ref.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-14');
            const icon = document.querySelector('.DT1');
            if (successIcon) {
                successIcon.style.display = 'inline';
                icon.id = 'icon-DecimoTerceiro2';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });

    //============================================================================================

    // Referência para a pasta do Decimo Terceiro2
    const DecimoTerceiro2Ref = firebase.storage().ref(userSelected + '/DecimoTerceiro2');

    // Listar todos os itens da pasta DecimoTerceiro2
    DecimoTerceiro2Ref.listAll().then((items) => {
        if (items.items.length > 0) {
            // Se existe pelo menos um item na pasta, exiba o ícone de verificação.
            const successIcon = document.getElementById('success-icon-15');
            const icon = document.querySelector('.DT2');
            if (successIcon) {
                successIcon.style.display = 'inline';
                icon.id = 'icon-DecimoTerceiro4';
            }
        }
    }).catch((error) => {
        console.error('Erro ao listar itens na pasta:', error);
    });
}

//============================================================================================


// Após o carregamento total do DOM, será verificado se as pastas estão com conteúdo dentro, se sim o ícone vai aparecer.
document.addEventListener('DOMContentLoaded', () => {
    checkAndDisplayVerificationIcon();
});

// userFolder = Nome do usuário que foi selecionado na adminlist, que vai ser a pasta pai no Storage
// monthFolder = Nome do ID que está na div pai no elemento clicado, que vai ser o nome da pasta filho.
// inputId = É o ID do Input aonde onde vai ser realizado o submit do file.
// successIconId = É o ID do ícone que será mostrado no container.

// Função para lidar com o upload do holerite.
function fileUpload(userFolder, monthFolder, inputId, successIconId) {
    const inputElement = document.getElementById(inputId);
    const file = inputElement.files[0];

    // Referência para a pasta do mês
    const monthRef = firebase.storage().ref(`${userFolder}/${monthFolder}`);

    monthRef.child(`Holerite-de-${monthFolder}.pdf`).put(file).then((snapshot) => {

        // Após o upload, definir um indicador no localStorage
        localStorage.setItem(`${userFolder}-${monthFolder}`, 'true');

        // Exibir imediatamente o ícone de verificação
        const successIcon = document.getElementById(successIconId);
        if (successIcon) {
            successIcon.style.display = 'inline';
        }
    }).catch((error) => {
        console.error('Erro no upload:', error);
    });
};


// Função para inicializar o comportamento para cada container de mês
function initializeMonthContainer(userFolder, monthFolder, inputId, successIconId) {
    const inputElement = document.getElementById(inputId);

    if (inputElement) {
        // Configurar o evento onchange para lidar com o upload do arquivo
        inputElement.onchange = () => {
            fileUpload(userFolder, monthFolder, inputId, successIconId);
        };
    }
}


// Pegando os valores dos IDs para os argumentos das funções. 
let pdfUpload, pdfUploadID, month, successIcon;

document.addEventListener('click', (e) => {
    const elementClicked = e.target;
    pdfUpload = elementClicked.id;

    if (pdfUpload) {

        // Verifica se encontrou a div-pai
        const divPai = elementClicked.closest('div');

        if (divPai) {
            // Obtém todos os elementos dentro da div-pai
            const elementosDaDiv = divPai.querySelectorAll('*');

            // Itera sobre os elementos e armazena os IDs
            elementosDaDiv.forEach((elemento, index) => {

                // Verifica se o elemento tem um ID atribuído
                if (elemento.id) {
                    switch (index) {
                        case 0:
                            month = elemento.id;
                            break;
                        case 1:
                            // Este elemento não precisa.
                            break;
                        case 2:
                            // Este elemento no HTML não possui ID.
                            break;
                        case 3:
                            successIcon = elemento.id;
                            break;
                        case 4:
                            pdfUploadID = elemento.id;
                    }
                }
            });

            // Argumentos para as funções:
            // Usuário Selecionado,  Mês,  ID do Input de Upload, ID da img success
            initializeMonthContainer(userSelected, month, pdfUploadID, successIcon);

        }
    }
});


//Lógica diferente dos meses:
//=======================================================================================

// Função para lidar com o upload do holerite IRRF.
function fileUpload2() {
    const inputElement = document.getElementById('pdfUpload13');
    const file = inputElement.files[0];

    // Referência para a pasta do mês
    const monthRef = firebase.storage().ref(userSelected + '/IRRF');

    monthRef.child('Holerite-de-IRRF.pdf').put(file).then((snapshot) => {

        // Após o upload, definir um indicador no localStorage
        localStorage.setItem(userSelected + '-IRRF', 'true');

        // Exibir imediatamente o ícone de verificação
        const successIcon = document.getElementById('success-icon-13');
        const irrfIcon = document.querySelector('.irrf');
        if (successIcon) {
            successIcon.style.display = 'inline';
            irrfIcon.id = 'irrf-adm-2';
        }
    }).catch((error) => {
        console.error('Erro no upload:', error);
    });
};

const inputElementIRRF = document.getElementById('pdfUpload13');

inputElementIRRF.addEventListener('change', () => {
    if (inputElementIRRF) {
        fileUpload2();
    }
});

//=======================================================================================

// Função para lidar com o upload do holerite Décimo Terceiro primeira parcela.
function fileUpload3() {
    const inputElement = document.getElementById('pdfUpload14');
    const file = inputElement.files[0];

    // Referência para a pasta do mês
    const monthRef = firebase.storage().ref(userSelected + '/DecimoTerceiro1');

    monthRef.child('Holerite-de-DecimoTerceiro1.pdf').put(file).then((snapshot) => {

        // Após o upload, definir um indicador no localStorage
        localStorage.setItem(userSelected + '-DecimoTerceiro1', 'true');

        // Exibir imediatamente o ícone de verificação
        const successIcon = document.getElementById('success-icon-14');
        const irrfIcon = document.querySelector('.DT1');
        if (successIcon) {
            successIcon.style.display = 'inline';
            irrfIcon.id = 'icon-DecimoTerceiro2';
        }
    }).catch((error) => {
        console.error('Erro no upload:', error);
    });
};

const inputElementDT1 = document.getElementById('pdfUpload14');

inputElementDT1.addEventListener('change', () => {
    if (inputElementDT1) {
        fileUpload3();
    }
});

//=======================================================================================

// Função para lidar com o upload do holerite Décimo Terceiro Segunda parcela.
function fileUpload4() {
    const inputElement = document.getElementById('pdfUpload15');
    const file = inputElement.files[0];

    // Referência para a pasta do mês
    const monthRef = firebase.storage().ref(userSelected + '/DecimoTerceiro2');

    monthRef.child('Holerite-de-DecimoTerceiro2.pdf').put(file).then((snapshot) => {

        // Após o upload, definir um indicador no localStorage
        localStorage.setItem(userSelected + '-DecimoTerceiro2', 'true');

        // Exibir imediatamente o ícone de verificação
        const successIcon = document.getElementById('success-icon-15');
        const irrfIcon = document.querySelector('.DT2');
        if (successIcon) {
            successIcon.style.display = 'inline';
            irrfIcon.id = 'icon-DecimoTerceiro4';
        }
    }).catch((error) => {
        console.error('Erro no upload:', error);
    });
};

const inputElementDT2 = document.getElementById('pdfUpload15');

inputElementDT2.addEventListener('change', () => {
    if (inputElementDT2) {
        fileUpload4();
    }
});

//=======================================================================================

const menu = document.getElementById('menu');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay-menu');
const logoSidebar = document.getElementById('logo-sidebar');

let adminSidebar; // Variável para pegar a div do admin

// O elemento admin ele está sendo gerado dinamicamente pelo o JS (ele está em uma função assíncrona onAuthStateChanged, então o único jeito de eu conseguir acessar esse valor foi dessa forma, criando uma função que recebe o argumento lá da função assíncrona, e assim eu consegui setar o este valor do argumento na minha variável.)
function handleNewDiv(newdiv) {
    adminSidebar = newdiv; //Pegando a div do admin
}

//Abrir sidebar
menu.addEventListener('click', () => {
    sidebar.classList.add('open-sidebar');
    adminSidebar.style.display = 'block';
});

//Fechar a sidebar
function closeSidebar() {
    sidebar.classList.remove('open-sidebar');
    adminSidebar.style.display = 'none';
}

sidebar.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// Aniamção do ícone de loading, usando a biblioteca Vivus, && Preloader
var overlayPreloader = document.querySelector('.overlay-preloader');
var preloaderLogo = document.getElementById('asas-rsup');

var myVivus = new Vivus('asas-rsup', {
    start: 'autostart',
    animTimingFunction: Vivus.EASE
});

new Vivus('asas-rsup', {}, function (myVivus) {
    myVivus.play(myVivus.getStatus() === 'end' ? -1 : 1);
})

function exitPreloader() {
    // Função para verificar se os elementos foram carregados
    function checkElementsLoaded() {
        var overlayPreloader = document.querySelector('.overlay-preloader');
        var preloaderLogo = document.getElementById('asas-rsup');
        var dynamicElementsLoaded = document.querySelectorAll('.admin');

        // Verifica se os elementos dinâmicos foram carregados
        if (dynamicElementsLoaded.length > 0) {
            setTimeout(() => {
                overlayPreloader.style.display = 'none';
                preloaderLogo.style.display = 'none';
            }, 1480);
        } else {
            // Se os elementos ainda não foram carregados, aguarde e verifique novamente
            setTimeout(checkElementsLoaded, 100);
        }
    }

    // Inicie a verificação
    checkElementsLoaded();
}