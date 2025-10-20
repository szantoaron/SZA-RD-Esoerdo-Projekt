 function renderAnimals(filter = 'all') {
        const grid = document.getElementById('animalsGrid');
       grid.innerHTML = ''
       const filteredAnimals = filter === 'all' 
           ? animals 
           : animals.filter(animal => animal.category === filter)
       filteredAnimals.forEach(animal => {
           const card = document.createElement('div');
           card.className = 'animal-card';
           card.innerHTML = `
               <div class="animal-image" style="background-image: url('${animal.image}')">
                   <span class="animal-badge">${animal.badge}</span>
               </div>
               <div class="animal-content">
                   <h3>${animal.name}</h3>
                   <p class="latin-name">${animal.latinName}</p>
                   <p>${animal.description}</p>
                   <div class="animal-stats">
                       <div class="stat">
                           <i class="fas fa-weight"></i>
                           <span>${animal.weight}</span>
                       </div>
                       <div class="stat">
                           <i class="fas fa-tree"></i>
                           <span>${animal.habitat}</span>
                       </div>
                       <div class="stat">
                           <i class="fas fa-clock"></i>
                           <span>${animal.lifespan}</span>
                       </div>
                   </div>
                   <span class="conservation-status status-${animal.conservation}">
                       ${animal.conservationText}
                   </span>
               </div>
           `;
           card.addEventListener('click', () => openModal(animal));
           grid.appendChild(card);
       });
}


 document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                renderAnimals(this.dataset.filter);
            });
});



function openModal(animal) {
            const modal = document.getElementById('animalModal');
            const modalHeader = document.getElementById('modalHeader');
            const modalBody = document.getElementById('modalBody');

            modalHeader.style.backgroundImage = `url('${animal.image}')`;
            modalBody.innerHTML = `
                <h2>${animal.name}</h2>
                <p class="latin-name">${animal.latinName}</p>
                <span class="conservation-status status-${animal.conservation}">
                    ${animal.conservationText}
                </span>
                <p style="margin-top: 20px; line-height: 1.8; color: #666;">${animal.fullDescription}</p>
                
                <div class="modal-info-grid">
                    <div class="info-box">
                        <h4><i class="fas fa-utensils"></i> Táplálkozás</h4>
                        <p>${animal.diet}</p>
                    </div>
                    <div class="info-box">
                        <h4><i class="fas fa-paw"></i> Viselkedés</h4>
                        <p>${animal.behavior}</p>
                    </div>
                    <div class="info-box">
                        <h4><i class="fas fa-exclamation-triangle"></i> Fenyegetések</h4>
                        <p>${animal.threats}</p>
                    </div>
                    <div class="info-box">
                        <h4><i class="fas fa-home"></i> Élőhely</h4>
                        <p>${animal.habitat}</p>
                    </div>
                </div>
            `;

            modal.style.display = 'block';
}


document.querySelector('.close-modal').addEventListener('click', function() {
            document.getElementById('animalModal').style.display = 'none';
});

        window.addEventListener('click', function(e) {
            const modal = document.getElementById('animalModal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
});

renderAnimals();
