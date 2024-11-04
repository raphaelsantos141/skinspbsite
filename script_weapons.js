// Obter o nome da arma da URL
const params = new URLSearchParams(window.location.search);
const weaponName = params.get('name');

// Atualizar o título
document.getElementById('weapon-name').innerText = weaponName;

// Configurando a cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping; // Mapeamento de tom para suavizar as altas luzes
renderer.toneMappingExposure = 2.8; // Aumenta a exposição geral, aumentando o brilho
document.getElementById('weapon-container').appendChild(renderer.domElement);

// Adicionando luz
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Aumenta a luz ambiente para mais brilho
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Reduz a luz direcional para reduzir o contraste
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Luz de preenchimento
const fillLight = new THREE.DirectionalLight(0xffffff, 0.8); // Reduz a luz de preenchimento para equilibrar
fillLight.position.set(-5, -5, -5).normalize(); // Posição oposta à luz direcional
scene.add(fillLight);

// Luz pontual
const pointLight = new THREE.PointLight(0xffffff, 0.6, 100); // Luz pontual com brilho moderado
pointLight.position.set(0, 2, 2); // Posição da luz
scene.add(pointLight);

// Carregando a textura de fundo
const textureLoader = new THREE.TextureLoader();
textureLoader.load('/img/background.png', (texture) => {
    scene.background = texture; // Definindo a textura como fundo da cena
});

// Mapeando os nomes das armas para os caminhos dos modelos
const weaponModels = {
    "Aug A3": "/models/aug_a3.glb",
    "K-400": "path/to/k400.glb",
    "Bora-12": "path/to/bora12.glb",
    // Adicione mais armas e seus respectivos caminhos de modelo
};

// Carregar o modelo GLB correspondente
const loader = new THREE.GLTFLoader();
const modelPath = weaponModels[weaponName];

if (modelPath) {
    loader.load(modelPath, (gltf) => {
        const model = gltf.scene;
        // Ajuste a posição do modelo aqui
        model.position.set(0, -0.8, 0); // Mova o modelo um pouco para cima e para trás
        scene.add(model);
        animate();
    }, undefined, (error) => {
        console.error('Erro ao carregar o modelo:', error);
    });
} else {
    console.error('Modelo não encontrado para a arma:', weaponName);
}

// Configurar controles de órbita
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Suaviza os movimentos
controls.dampingFactor = 0.25; // Fator de suavização
controls.screenSpacePanning = false; // Impede a movimentação da câmera para fora do espaço
controls.maxPolarAngle = Math.PI; // Permite rotação total vertical
controls.minPolarAngle = 0; // Permite rotação total vertical
controls.maxDistance = 8; // Distância máxima
controls.minDistance = 4; // Distância mínima

// Rotação automática do modelo
let autoRotateSpeed = 0.000; // Velocidade de rotação automática

// Loop de animação
function animate() {
    requestAnimationFrame(animate);

    // Rotação automática do modelo
    scene.rotation.y += autoRotateSpeed;

    controls.update(); // Atualiza os controles
    renderer.render(scene, camera);
}

// Ajustar a posição da câmera
camera.position.set(0, 0, -5); // Aumenta o eixo Y para subir a câmera

// Tratar redimensionamento da janela
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
