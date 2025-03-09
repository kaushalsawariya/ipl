
function calculateBet() {
    const betAmount = parseFloat(document.getElementById('betAmount').value);
    const redRate = parseFloat(document.getElementById('redRate').value);
    const blueRate = parseFloat(document.getElementById('blueRate').value);
    const ered = document.getElementById('ered').checked;
    const eblue = document.getElementById('eblue').checked;

    const redBet = betAmount / redRate;
    const blueBet = betAmount / blueRate;
    const totalBet = redBet + blueBet;
    let profit = 0;

    if (ered) profit += betAmount;
    if (eblue) profit += betAmount;

    // Create pie chart
    const ctx = document.createElement('canvas');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Red Team Bet', 'Blue Team Bet'],
            datasets: [{
                data: [redBet, blueBet],
                backgroundColor: ['rgba(239, 68, 68, 0.8)', 'rgba(59, 130, 246, 0.8)'],
                borderColor: ['#ef4444', '#3b82f6'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#fff' }
                }
            }
        }
    });

    let resultHTML = `
        <div class="result-card card p-4 animate__animated animate__fadeInUp">
            <h4 class="text-center mb-4">Betting Analysis</h4>
            
            <div class="row g-4">
                <div class="col-md-6 mb-4">
                    ${ctx.outerHTML}
                </div>
                <div class="col-md-6 mb-4">
                    <div class="stat-card p-3">
                        <h6 class="text-center mb-3">Investment Overview</h6>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Total Investment</span>
                            <span>₹${totalBet.toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>ROI</span>
                            <span class="${profit > totalBet ? 'profit-text' : 'loss-text'}">
                                ${((profit - totalBet) / totalBet * 100).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-4 mt-2">
                <div class="col-md-6">
                    <div class="team-stats p-3 red-section">
                        <h6><span class="team-indicator red-team"></span>Red Team</h6>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Bet Amount</span>
                            <span>₹${redBet.toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Potential Return</span>
                            <span>₹${(ered ? betAmount : 0).toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Result</span>
                            <span class="${ered ? 'profit-text' : 'loss-text'}">
                                ${ered ? `+₹${(betAmount - redBet).toFixed(2)}` : `-₹${redBet.toFixed(2)}`}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="team-stats p-3 blue-section">
                        <h6><span class="team-indicator blue-team"></span>Blue Team</h6>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Bet Amount</span>
                            <span>₹${blueBet.toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Potential Return</span>
                            <span>₹${(eblue ? betAmount : 0).toFixed(2)}</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <span>Result</span>
                            <span class="${eblue ? 'profit-text' : 'loss-text'}">
                                ${eblue ? `+₹${(betAmount - blueBet).toFixed(2)}` : `-₹${blueBet.toFixed(2)}`}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-4 text-center">
                <div class="result-summary p-4">
                    <h5 class="mb-3">Final Result</h5>
                    <h3 class="${profit > totalBet ? 'profit-text' : 'loss-text'}">
                        ${profit > totalBet ? `+₹${(profit - totalBet).toFixed(2)}` : `-₹${(totalBet - profit).toFixed(2)}`}
                    </h3>
                    <p class="mt-2">${getResultMessage(ered, eblue)}</p>
                </div>
            </div>
        </div>`;

    document.getElementById('result').innerHTML = resultHTML;
}

function getResultMessage(ered, eblue) {
    if (ered && eblue) return "Both teams won! Maximum profit achieved!";
    if (ered) return "Red team won! Blue team bet lost.";
    if (eblue) return "Blue team won! Red team bet lost.";
    return "No winners. All bets lost.";
}