// Color Mixer for Colors page
document.addEventListener('DOMContentLoaded', () => {
    // Color mixing functionality
    const colorMixer = document.querySelector('.color-mixer');
    if (colorMixer) {
        const color1Select = document.getElementById('color1');
        const color2Select = document.getElementById('color2');
        const mixButton = document.getElementById('mixColors');
        const color1Box = document.querySelector('.color1');
        const color2Box = document.querySelector('.color2');
        const resultBox = document.querySelector('.result');
        const resultText = document.querySelector('.result-text p');
        
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
        
        function rgbToHex(r, g, b) {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        
        function updateColorBoxes() {
            const color1 = color1Select.value;
            const color2 = color2Select.value;
            
            color1Box.style.backgroundColor = color1;
            color2Box.style.backgroundColor = color2;
        }
        
        function mixColors() {
            const color1 = hexToRgb(color1Select.value);
            const color2 = hexToRgb(color2Select.value);
            
            // Simple additive color mixing
            const mixedR = Math.floor((color1.r + color2.r) / 2);
            const mixedG = Math.floor((color1.g + color2.g) / 2);
            const mixedB = Math.floor((color1.b + color2.b) / 2);
            
            const mixedColor = rgbToHex(mixedR, mixedG, mixedB);
            resultBox.style.backgroundColor = mixedColor;
            
            // Determine the resulting color name (simplified)
            let colorName = "Mixed Color";
            if (mixedR > 200 && mixedG > 200 && mixedB < 100) colorName = "Yellow";
            else if (mixedR > 200 && mixedG < 100 && mixedB < 100) colorName = "Red";
            else if (mixedR < 100 && mixedG > 200 && mixedB < 100) colorName = "Green";
            else if (mixedR < 100 && mixedG < 100 && mixedB > 200) colorName = "Blue";
            else if (mixedR > 200 && mixedG > 100 && mixedB < 100) colorName = "Orange";
            else if (mixedR > 150 && mixedG < 100 && mixedB > 150) colorName = "Purple";
            
            resultText.textContent = `You made: ${colorName}`;
        }
        
        // Set initial colors
        updateColorBoxes();
        
        // Event listeners
        color1Select.addEventListener('change', updateColorBoxes);
        color2Select.addEventListener('change', updateColorBoxes);
        mixButton.addEventListener('click', mixColors);
    }
    
    // Shape hunt game functionality
    const shapeHunt = document.querySelector('.shape-hunt');
    if (shapeHunt) {
        const shapeSpots = document.querySelectorAll('.shape-spot');
        const shapeButtons = document.querySelectorAll('.shape-button');
        const huntResult = document.querySelector('.hunt-result');
        const resetHunt = document.querySelector('.reset-hunt');
        
        let selectedShape = null;
        let foundShapes = 0;
        
        shapeButtons.forEach(button => {
            button.addEventListener('click', () => {
                selectedShape = button.dataset.shape;
                
                // Visual feedback for selected shape
                shapeButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
            });
        });
        
        shapeSpots.forEach(spot => {
            spot.addEventListener('click', () => {
                if (!selectedShape) {
                    alert('Please select a shape first!');
                    return;
                }
                
                if (spot.dataset.shape === selectedShape) {
                    // Correct match
                    spot.classList.add('found');
                    spot.innerHTML = `<span class="spot-marker found">${selectedShape}</span>`;
                    
                    // Play success sound
                    const frequency = 800 + Math.random() * 400;
                    playSound(frequency, 0.3);
                    
                    // Check if all shapes are found
                    foundShapes++;
                    if (foundShapes === shapeSpots.length) {
                        huntResult.style.display = 'block';
                        playSound(800, 0.5);
                        setTimeout(() => playSound(1000, 0.5), 300);
                        setTimeout(() => playSound(1200, 0.8), 600);
                    }
                } else {
                    // Wrong match
                    spot.classList.add('wrong');
                    setTimeout(() => {
                        spot.classList.remove('wrong');
                    }, 800);
                    
                    // Play error sound
                    playSound(200, 0.3);
                }
            });
        });
        
        resetHunt?.addEventListener('click', () => {
            shapeSpots.forEach(spot => {
                spot.classList.remove('found', 'wrong');
                spot.innerHTML = '<span class="spot-marker">?</span>';
            });
            foundShapes = 0;
            huntResult.style.display = 'none';
        });
    }
    
    // Animal sound game functionality
    const soundGame = document.querySelector('.sound-game');
    if (soundGame) {
        const soundButton = document.querySelector('.sound-button');
        const animalOptions = document.querySelectorAll('.animal-option');
        const feedback = document.querySelector('.feedback');
        const nextSound = document.querySelector('.next-sound');
        
        soundButton?.addEventListener('click', () => {
            const sound = soundButton.dataset.sound;
            // In a real app, play the actual sound here
            alert(`Playing sound: ${sound}`);
        });
        
        animalOptions.forEach(option => {
            option.addEventListener('click', () => {
                const sound = soundButton.dataset.sound;
                const animal = option.dataset.animal;
                
                if ((sound === 'bark' && animal === 'dog') ||
                    (sound === 'meow' && animal === 'cat') ||
                    (sound === 'moo' && animal === 'cow') ||
                    (sound === 'hoot' && animal === 'owl')) {
                    // Correct match
                    feedback.innerHTML = '<p class="correct">Correct! That\'s right!</p>';
                    nextSound.style.display = 'block';
                    
                    // Play success sound
                    playSound(800, 0.5);
                    setTimeout(() => playSound(1000, 0.5), 300);
                } else {
                    // Wrong match
                    feedback.innerHTML = '<p class="incorrect">Try again!</p>';
                    
                    // Play error sound
                    playSound(200, 0.3);
                }
            });
        });
    }
    
    // Bird characteristics game functionality
    const characteristicsGame = document.querySelector('.characteristics-game');
    if (characteristicsGame) {
        const revealButtons = document.querySelectorAll('.reveal-btn');
        
        revealButtons.forEach(button => {
            button.addEventListener('click', () => {
                const characteristicDiv = button.nextElementSibling;
                const characteristic = button.dataset.characteristic;
                
                if (characteristicDiv.style.display === 'none' || !characteristicDiv.style.display) {
                    characteristicDiv.style.display = 'block';
                    characteristicDiv.innerHTML = `<p>${characteristic}</p>`;
                    button.textContent = 'Hide';
                    
                    // Play reveal sound
                    playSound(600, 0.3);
                    setTimeout(() => playSound(800, 0.3), 200);
                } else {
                    characteristicDiv.style.display = 'none';
                    button.textContent = 'What\'s Special?';
                }
            });
        });
    }
    
    // Add counting game functionality for the Numbers page
    const countingGame = document.querySelector('.counting-game');
    if (countingGame) {
        const gameRounds = document.querySelectorAll('.game-round');
        
        gameRounds.forEach(round => {
            const options = round.querySelectorAll('.number-option');
            const feedback = round.querySelector('.feedback');
            const correctAnswer = round.dataset.correct;
            
            options.forEach(option => {
                option.addEventListener('click', () => {
                    if (option.textContent === correctAnswer) {
                        // Correct answer
                        feedback.innerHTML = '<p class="correct">Correct! Great counting!</p>';
                        
                        // Play success sound
                        playSound(800, 0.5);
                        setTimeout(() => playSound(1000, 0.5), 300);
                    } else {
                        // Wrong answer
                        feedback.innerHTML = '<p class="incorrect">Try again! Count carefully.</p>';
                        
                        // Play error sound
                        playSound(200, 0.3);
                    }
                });
            });
        });
    }
});