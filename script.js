document.addEventListener('DOMContentLoaded', () => {
    // === Dropdown sidebar ===
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(toggle => {
      toggle.addEventListener('click', e => {
        e.preventDefault();
        toggle.parentElement.classList.toggle('open');
      });
    });
  
    // === Jam Digital ===
    function updateClock() {
      const now = new Date();
      const time = now.toLocaleTimeString('id-ID', { hour12: false });
      const clock = document.getElementById('clock');
      if (clock) clock.textContent = time;
    }
    setInterval(updateClock, 1000);
    updateClock();
  
    // === Info Sekolah (untuk halaman index) ===
    const appName = localStorage.getItem('appName') || 'APLIKASI DAPODIK 3';
    const schoolName = localStorage.getItem('schoolName') || 'Nama Sekolah';
    const npsn = localStorage.getItem('npsn') || '12345678';
    const operator = localStorage.getItem('operator') || 'John Doe';
  
    const schoolInfo = document.querySelector('.school-info');
    if (schoolInfo && !document.getElementById('profileForm')) {
      schoolInfo.innerHTML = `
        <h3>${schoolName}</h3>
        <p>NPSN: ${npsn}<br>Operator: ${operator}</p>
      `;
    }
  
    const appTitle = document.getElementById('appTitle');
    if (appTitle) {
      appTitle.textContent = appName;
    }
  
    // === Grafik Jenis Kelamin Siswa ===
    const genderCanvas = document.getElementById('genderChart');
    if (genderCanvas) {
      const genderCtx = genderCanvas.getContext('2d');
      new Chart(genderCtx, {
        type: 'doughnut',
        data: {
          labels: ['Laki-laki', 'Perempuan'],
          datasets: [{
            data: [700, 534],
            backgroundColor: ['#1a237e', '#64b5f6'],
          }]
        }
      });
    }
  
    // === Grafik Status Guru ===
    const teacherCanvas = document.getElementById('teacherChart');
    if (teacherCanvas) {
      const teacherCtx = teacherCanvas.getContext('2d');
      new Chart(teacherCtx, {
        type: 'bar',
        data: {
          labels: ['PNS', 'PPPK', 'Honor'],
          datasets: [{
            label: 'Jumlah Guru',
            data: [30, 15, 44],
            backgroundColor: ['#1a237e', '#64b5f6', '#90caf9']
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  
    // === Halaman Edit Profil ===
    const appInput = document.getElementById('appName');
    const schoolInput = document.getElementById('schoolName');
    const npsnInput = document.getElementById('npsn');
    const operatorInput = document.getElementById('operatorName');
    const form = document.getElementById('profileForm');
    const editBtn = document.getElementById('editBtn');
    const saveBtn = document.getElementById('saveBtn');
  
    if (form && appInput && schoolInput && npsnInput && operatorInput) {
      const loadingEl = document.createElement('div');
      loadingEl.id = 'loadingSpinner';
      loadingEl.style.display = 'none';
      loadingEl.innerHTML = `
        <div class="spinner"></div>
        <p>Sedang update...</p>
      `;
      form.appendChild(loadingEl);
  
      // Isi form dari localStorage
      appInput.value = localStorage.getItem('appName') || 'APLIKASI DAPODIK 3';
      schoolInput.value = localStorage.getItem('schoolName') || '';
      npsnInput.value = localStorage.getItem('npsn') || '';
      operatorInput.value = localStorage.getItem('operator') || '';
  
      [appInput, schoolInput, npsnInput, operatorInput].forEach(input => input.setAttribute('disabled', 'true'));
  
      // Tombol Edit
      editBtn.addEventListener('click', () => {
        [appInput, schoolInput, npsnInput, operatorInput].forEach(input => input.removeAttribute('disabled'));
      });
  
      // Tombol Simpan
      form.addEventListener('submit', e => {
        e.preventDefault();
        showLoading();
        setTimeout(() => {
          localStorage.setItem('appName', appInput.value);
          localStorage.setItem('schoolName', schoolInput.value);
          localStorage.setItem('npsn', npsnInput.value);
          localStorage.setItem('operator', operatorInput.value);
  
          [appInput, schoolInput, npsnInput, operatorInput].forEach(input => input.setAttribute('disabled', 'true'));
          hideLoading();
          alert('Data berhasil disimpan!');
        }, 1500);
      });
  
      function showLoading() {
        loadingEl.style.display = 'flex';
        saveBtn.disabled = true;
        editBtn.disabled = true;
      }
  
      function hideLoading() {
        loadingEl.style.display = 'none';
        saveBtn.disabled = false;
        editBtn.disabled = false;
      }
    }
  });
  