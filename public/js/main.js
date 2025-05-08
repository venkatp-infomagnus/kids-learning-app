// Main JS file for Kids Learning App

document.addEventListener('DOMContentLoaded', () => {
    // Audio context for sound effects
    let audioContext;
    
    // Initialize audio context on user interaction
    document.body.addEventListener('click', initAudio, { once: true });
    
    function initAudio() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Audio context initialized');
    }
    
    // Play a sound effect
    function playSound(frequency, duration) {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Fade out
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    }
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('.interactive-element');
    interactiveElements.forEach(element => {
        element.addEventListener('click', () => {
            // Play a random happy sound
            const frequency = 300 + Math.random() * 500;
            playSound(frequency, 0.3);
            
            // Add animation class
            element.classList.add('animate');
            setTimeout(() => {
                element.classList.remove('animate');
            }, 500);
            
            // If there's audio data attached to this element, play it
            const audioSrc = element.dataset.audio;
            if (audioSrc) {
                const audio = new Audio(audioSrc);
                audio.play();
            }
        });
    });
    
    // Handle quiz functionality if present
    const quizForms = document.querySelectorAll('.quiz-form');
    quizForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const questions = form.querySelectorAll('.quiz-question');
            let score = 0;
            
            questions.forEach(question => {
                const selectedOption = question.querySelector('input:checked');
                if (selectedOption && selectedOption.value === question.dataset.correct) {
                    score++;
                    question.classList.add('correct');
                } else {
                    question.classList.add('incorrect');
                }
            });
            
            const resultElement = form.querySelector('.quiz-result');
            if (resultElement) {
                resultElement.textContent = `You got ${score} out of ${questions.length} correct!`;
                resultElement.classList.add('show');
                
                // Play success sound if score is good
                if (score / questions.length >= 0.7) {
                    playSound(800, 0.5);
                    setTimeout(() => playSound(1000, 0.5), 300);
                    setTimeout(() => playSound(1200, 0.8), 600);
                }
            }
        });
    });
    
    // Handle drag and drop matching if present
    const draggableItems = document.querySelectorAll('.draggable');
    const dropTargets = document.querySelectorAll('.drop-target');
    
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.dataset.value);
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });
    
    dropTargets.forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
            target.classList.add('drag-over');
        });
        
        target.addEventListener('dragleave', () => {
            target.classList.remove('drag-over');
        });
        
        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.classList.remove('drag-over');
            
            const draggedValue = e.dataTransfer.getData('text/plain');
            const correctValue = target.dataset.value;
            
            if (draggedValue === correctValue) {
                target.classList.add('correct-match');
                target.textContent = draggedValue;
                
                // Play success sound
                playSound(600, 0.3);
                
                // Check if all matches are complete
                const allMatched = [...dropTargets].every(t => t.classList.contains('correct-match'));
                if (allMatched) {
                    document.querySelector('.matching-result')?.classList.add('show');
                    playSound(800, 0.5);
                    setTimeout(() => playSound(1000, 0.8), 300);
                }
            } else {
                target.classList.add('wrong-match');
                setTimeout(() => {
                    target.classList.remove('wrong-match');
                }, 800);
                
                // Play error sound
                playSound(200, 0.3);
            }
        });
    });
});