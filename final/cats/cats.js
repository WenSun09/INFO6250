const imagesList = [
    "placekitten1.jpg",
    "placekitten2.jpg",
    "placekitten3.jpg",
    "placekitten4.jpg",
    "placekitten5.jpg",
    "placekitten6.jpg",
    "placekitten7.jpg",
    "placekitten8.jpg",
    "placekitten9.jpg",
];
const catsInfo = {
    catsList: [
        {
            index: 0,
            name: "Jorts",
            image: "placekitten4.jpg",
            breed: "Domestic Short Hair",
            registrant: "Admin",
            adopter: "",
        },
        {
            index: 1,
            name: "Jean",
            image: "placekitten5.jpg",
            breed: "Tabby",
            registrant: "Admin",
            adopter: "",
        },
        {
            index: 2,
            name: "Maru",
            image: "placekitten6.jpg",
            breed: "Russian Blue",
            registrant: "Admin",
            adopter: "",
        },
        {
            index: 3,
            name: "Nyancat",
            image: "placekitten7.jpg",
            breed: "Tuxedo",
            registrant: "Admin",
            adopter: "",
        },
        {
            index: 4,
            name: "Grumpy Cat",
            image: "placekitten8.jpg",
            breed: "Tortoiseshell",
            registrant: "Admin",
            adopter: "",
        },
        {
            index: 5,
            name: "Lil Bub",
            image: "placekitten9.jpg",
            breed: "Calico",
            registrant: "Admin",
            adopter: "",
        },
    ],
    catsRecords: [
        "Admin registered a cat Jorts",
        "Admin registered a cat Jean",
        "Admin registered a cat Maru",
        "Admin registered a cat Nyancat",
        "Admin registered a cat Grumpy Cat",
        "Admin registered a cat Lil Bub",
    ],
};

function getCatsInfo() {
    return catsInfo;
}

function adoptCat(index, username) {
    catsInfo.catsList[index].adopter = username;
    catsInfo.catsRecords.push(`${username} adopted a cat ${catsInfo.catsList[index].name}`);
}

function registerCat(username, name, breed) {
    imageIndex = Math.floor(Math.random() * imagesList.length);
    catsInfo.catsList.push({
        index: catsInfo.catsList.length,
        name: name,
        image: imagesList[imageIndex],
        breed: breed,
        registrant: username,
        adopter: "",
    });
    catsInfo.catsRecords.push(`${username} registered a cat ${name}`);
}

function isValidName(name) {
    let isValid = true;
    isValid = isValid && name.trim();
    isValid = isValid && name.match(/^[A-Za-z]+$/);
    return isValid;
}

module.exports = {
    getCatsInfo,
    adoptCat,
    registerCat,
    isValidName,
};