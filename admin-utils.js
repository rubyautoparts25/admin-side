// Admin Utilities - Shared functions for admin features

// API Configuration - Update this to your server URL when deployed
// Make it available globally to avoid redeclaration errors
if (typeof window.API_BASE_URL === 'undefined') {
    window.API_BASE_URL = 'http://localhost:3000/api';
}
const API_BASE_URL = window.API_BASE_URL;
// For production: window.API_BASE_URL = 'https://your-server.railway.app/api';

// Check if user is admin
function isAdmin() {
    return sessionStorage.getItem('isAdmin') === 'true';
}

// Logout admin
function logoutAdmin() {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('adminLoginTime');
    window.location.reload();
}

// Show admin controls if logged in
function showAdminControls() {
    if (!isAdmin()) return;
    
    // Add logout button to navbar
    addLogoutButton();
    
    // Show edit buttons on parts
    showEditButtons();
    
    // Show add part button
    showAddPartButton();
}

// Add logout button to navbar
function addLogoutButton() {
    // Check if logout button already exists
    if (document.getElementById('adminLogoutBtn')) return;
    
    const navbar = document.querySelector('.nav-actions') || document.querySelector('.nav-menu');
    if (!navbar) return;
    
    const logoutBtn = document.createElement('button');
    logoutBtn.id = 'adminLogoutBtn';
    logoutBtn.className = 'admin-logout-btn';
    logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
    logoutBtn.onclick = () => {
        if (confirm('Are you sure you want to logout?')) {
            logoutAdmin();
        }
    };
    
    // Insert before hamburger or at end
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.parentNode.insertBefore(logoutBtn, hamburger);
    } else {
        navbar.appendChild(logoutBtn);
    }
}

// Show edit buttons on part cards
function showEditButtons() {
    // This will be called after parts are displayed
    // Edit buttons are added in displayParts function
}

// Show add part button
function showAddPartButton() {
    // Check if button already exists
    if (document.getElementById('adminAddPartBtn')) return;
    
    // Find a good place to add the button (before parts grid or after filters)
    const partsSection = document.querySelector('.category-parts-section') || document.querySelector('#parts');
    if (!partsSection) return;
    
    const container = partsSection.querySelector('.container');
    if (!container) return;
    
    // Find filters container or create button container
    const filtersWrapper = container.querySelector('.search-filters-wrapper');
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'admin-add-part-container';
    buttonContainer.style.cssText = 'margin: 20px 0; text-align: right;';
    
    const addBtn = document.createElement('button');
    addBtn.id = 'adminAddPartBtn';
    addBtn.className = 'admin-add-part-btn';
    addBtn.innerHTML = '<i class="fas fa-plus"></i> Add New Part';
    addBtn.onclick = () => openAddPartModal();
    
    buttonContainer.appendChild(addBtn);
    
    // Insert after filters or at top of container
    if (filtersWrapper) {
        filtersWrapper.parentNode.insertBefore(buttonContainer, filtersWrapper.nextSibling);
    } else {
        container.insertBefore(buttonContainer, container.firstChild);
    }
}

// Open add part modal
function openAddPartModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('addPartModal');
    if (!modal) {
        modal = createAddPartModal();
        document.body.appendChild(modal);
    }
    modal.classList.add('active');
}

// Create add part modal
function createAddPartModal() {
    const modal = document.createElement('div');
    modal.id = 'addPartModal';
    modal.className = 'admin-modal';
    
    modal.innerHTML = `
        <div class="admin-modal-overlay" onclick="closeAddPartModal()"></div>
        <div class="admin-modal-content">
            <div class="admin-modal-header">
                <h2><i class="fas fa-plus-circle"></i> Add New Part</h2>
                <button class="admin-modal-close" onclick="closeAddPartModal()">&times;</button>
            </div>
            <form id="addPartForm" class="admin-modal-form" onsubmit="saveNewPart(event)">
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-folder"></i> Category *</label>
                        <select id="newPartCategory" required>
                            <option value="">Select Category</option>
                            <option value="air-conditioning">Air Conditioning System</option>
                            <option value="body-parts">Body Parts</option>
                            <option value="lamp-parts">Lamp and Parts</option>
                            <option value="suspension-steering">Suspension and Steering Parts</option>
                            <option value="engine">Engine Parts</option>
                            <option value="electrical">Electrical</option>
                            <option value="wheels-tires">Wheels and Tires</option>
                            <option value="oil-fluids">Oil and Fluids</option>
                            <option value="windscreen-cleaning">Windscreen Cleaning System</option>
                            <option value="clutch">Clutch System</option>
                            <option value="transmission">Transmission</option>
                            <option value="filters">Filters</option>
                            <option value="interiors">Interiors Comfort and Safety</option>
                            <option value="gasket-seals">Gasket and Seals</option>
                            <option value="fuel">Fuel System</option>
                            <option value="exhaust">Exhaust System</option>
                            <option value="cooling">Cooling System</option>
                            <option value="service-kit">Service Kit</option>
                            <option value="accessories">Car Accessories</option>
                            <option value="brake">Brake System</option>
                            <option value="belt-chain">Belt and Chain Drive</option>
                            <option value="fasteners">Fasteners</option>
                            <option value="lighting">Lighting</option>
                            <option value="universal">UNIVERSAL</option>
                        </select>
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-barcode"></i> Part Number *</label>
                        <input type="text" id="newPartNumber" placeholder="e.g., BRE-001-BRK" required>
                    </div>
                </div>
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-car"></i> Car Brand *</label>
                        <input type="text" id="newCarBrand" placeholder="e.g., Maruti Suzuki" required>
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-tag"></i> Part Brand *</label>
                        <input type="text" id="newPartBrand" placeholder="e.g., BREMBO" required>
                    </div>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-cog"></i> Part Name *</label>
                    <input type="text" id="newPartName" placeholder="e.g., Brake Pads" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-image"></i> Image</label>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
                        <label for="newPartImageFile" style="flex: 1; min-width: 150px; padding: 12px 20px; background: var(--beige-light); border: 2px solid var(--beige-dark); border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <i class="fas fa-folder-open"></i>
                            <span>Choose File</span>
                        </label>
                        <label for="newPartImageCamera" class="camera-button" style="flex: 1; min-width: 150px; padding: 12px 20px; background: var(--orange-light); border: 2px solid var(--orange-medium); border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <i class="fas fa-camera"></i>
                            <span>Open Camera</span>
                        </label>
                    </div>
                    <input type="file" id="newPartImageFile" accept="image/*" onchange="previewNewImage(event)" style="display: none;">
                    <input type="file" id="newPartImageCamera" accept="image/*" capture="environment" onchange="previewNewImageFromCamera(event)" style="display: none;">
                    <div id="newImagePreview" class="admin-image-preview"></div>
                    <small style="display: block; margin-top: 10px;">Or enter image URL: <input type="text" id="newPartImageUrl" placeholder="https://..." style="width: 100%; margin-top: 5px; padding: 8px; border-radius: 5px; border: 1px solid var(--beige-dark);"></small>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-align-left"></i> Description</label>
                    <textarea id="newPartDescription" placeholder="Brief description of the part" rows="3"></textarea>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-list"></i> Specifications</label>
                    <textarea id="newPartSpecifications" placeholder="e.g., Low Dust | High Performance" rows="2"></textarea>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-rupee-sign"></i> Price (₹)</label>
                    <input type="number" id="newPartPrice" placeholder="e.g., 1500" min="0" step="0.01">
                </div>
                <div class="admin-form-actions">
                    <button type="submit" class="admin-btn admin-btn-primary">
                        <i class="fas fa-save"></i> Save Part
                    </button>
                    <button type="button" class="admin-btn admin-btn-secondary" onclick="closeAddPartModal()">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    return modal;
}

// Close add part modal
function closeAddPartModal() {
    const modal = document.getElementById('addPartModal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('addPartForm').reset();
        document.getElementById('newImagePreview').innerHTML = '';
    }
}

// Preview new image
function previewNewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('newImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 5px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(file);
        // Clear camera input to avoid conflicts
        const cameraInput = document.getElementById('newPartImageCamera');
        if (cameraInput) {
            cameraInput.value = '';
        }
    }
}

// Preview new image from camera
function previewNewImageFromCamera(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('newImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 5px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(file);
        
        // Copy file to main file input for form submission
        // Use a more reliable method than DataTransfer
        const mainInput = document.getElementById('newPartImageFile');
        if (mainInput) {
            // Create a new FileList-like object by directly setting files
            // Since we can't directly modify files property, we'll store it in a data attribute
            // and check both inputs during form submission
            console.log('📸 Camera image captured:', {
                name: file.name,
                size: file.size,
                type: file.type
            });
        }
    }
}

// Save new part via API
async function saveNewPart(event) {
    event.preventDefault();
    
    const categoryValue = document.getElementById('newPartCategory').value;
    console.log('💾 Saving part with category:', categoryValue);
    
    const formData = new FormData();
    formData.append('category', categoryValue);
    formData.append('carBrand', document.getElementById('newCarBrand').value);
    formData.append('partBrand', document.getElementById('newPartBrand').value);
    formData.append('partNumber', document.getElementById('newPartNumber').value);
    formData.append('partName', document.getElementById('newPartName').value);
    
    const description = document.getElementById('newPartDescription').value.trim();
    const specifications = document.getElementById('newPartSpecifications').value.trim();
    const imageUrl = document.getElementById('newPartImageUrl').value.trim();
    const price = document.getElementById('newPartPrice').value.trim();
    
    if (description) formData.append('description', description);
    if (specifications) formData.append('specifications', specifications);
    if (imageUrl) formData.append('imageUrl', imageUrl);
    if (price) formData.append('price', price);
    
    // Add image file if uploaded (check both inputs)
    const fileInput = document.getElementById('newPartImageFile');
    const cameraInput = document.getElementById('newPartImageCamera');
    
    let imageFile = null;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        imageFile = fileInput.files[0];
        console.log('📸 Image file from file input:', {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type
        });
    } else if (cameraInput && cameraInput.files && cameraInput.files.length > 0) {
        imageFile = cameraInput.files[0];
        console.log('📸 Image file from camera input:', {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type
        });
    }
    
    if (imageFile) {
        formData.append('image', imageFile);
        console.log('✅ Image file added to FormData');
    } else {
        console.log('⚠️ No image file selected');
    }
    
    try {
        console.log('📤 Sending part data to server...');
        const response = await fetch(`${API_BASE_URL}/parts`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        console.log('💾 Save response:', result);
        
        if (response.ok) {
            console.log('✅ Part saved successfully! Category:', categoryValue);
            if (result.data && result.data.image) {
                console.log('✅ Image URL saved:', result.data.image);
                alert('Part added successfully with image!');
            } else {
                console.warn('⚠️ Part saved but no image URL in response');
                if (imageFile) {
                    alert('Part added, but image may not have uploaded. Check server console for errors.');
                } else {
                    alert('Part added successfully! (No image uploaded)');
                }
            }
            closeAddPartModal();
            
            // Reload parts - use the category from URL (the page we're viewing)
            const urlParams = new URLSearchParams(window.location.search);
            const currentCategory = urlParams.get('category');
            
            if (currentCategory && typeof window.loadCategoryParts === 'function') {
                console.log('🔄 Reloading parts for category:', currentCategory);
                // Wait a moment for database to save, then reload
                setTimeout(async () => {
                    try {
                        await window.loadCategoryParts(currentCategory);
                        console.log('✅ Parts reloaded successfully');
                    } catch (error) {
                        console.error('❌ Error reloading parts:', error);
                        window.location.reload();
                    }
                }, 800);
            } else {
                // Fallback to page reload
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } else {
            console.error('❌ Server error:', result);
            alert(`Error: ${result.message || 'Failed to add part'}\n\nCheck server console for details.`);
        }
    } catch (error) {
        console.error('❌ Error saving part:', error);
        alert('Error connecting to server. Please make sure the server is running.\n\nError: ' + error.message);
    }
}

// Open edit part modal
async function openEditPartModal(partId) {
    try {
        const response = await fetch(`${API_BASE_URL}/parts/${partId}`);
        if (!response.ok) {
            alert('Error loading part details');
            return;
        }
        
        const result = await response.json();
        const part = result.data;
        
        // Create modal if it doesn't exist
        let modal = document.getElementById('editPartModal');
        if (!modal) {
            modal = createEditPartModal();
            document.body.appendChild(modal);
        }
        
        // Populate form
        document.getElementById('editPartId').value = part._id;
        
        // Set category dropdown
        const categorySelect = document.getElementById('editPartCategory');
        if (categorySelect) {
            categorySelect.value = part.category;
        }
        document.getElementById('editPartNumber').value = part.partNumber || '';
        document.getElementById('editCarBrand').value = part.carBrand || '';
        document.getElementById('editPartBrand').value = part.partBrand || '';
        document.getElementById('editPartName').value = part.partName || '';
        document.getElementById('editPartImageUrl').value = part.image || '';
        document.getElementById('editPartDescription').value = part.description || '';
        document.getElementById('editPartSpecifications').value = part.specifications || '';
        document.getElementById('editPartPrice').value = part.price || '';
        
        // Show image preview if exists
        if (part.image) {
            document.getElementById('editImagePreview').innerHTML = `<img src="${part.image}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 5px; margin-top: 10px;">`;
        } else {
            document.getElementById('editImagePreview').innerHTML = '';
        }
        
        modal.classList.add('active');
    } catch (error) {
        console.error('Error loading part:', error);
        alert('Error loading part details');
    }
}

// Create edit part modal
function createEditPartModal() {
    const modal = document.createElement('div');
    modal.id = 'editPartModal';
    modal.className = 'admin-modal';
    
    modal.innerHTML = `
        <div class="admin-modal-overlay" onclick="closeEditPartModal()"></div>
        <div class="admin-modal-content">
            <div class="admin-modal-header">
                <h2><i class="fas fa-edit"></i> Edit Part</h2>
                <button class="admin-modal-close" onclick="closeEditPartModal()">&times;</button>
            </div>
            <form id="editPartForm" class="admin-modal-form" onsubmit="updatePart(event)">
                <input type="hidden" id="editPartId">
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-folder"></i> Category *</label>
                        <select id="editPartCategory" required>
                            <option value="air-conditioning">Air Conditioning System</option>
                            <option value="body-parts">Body Parts</option>
                            <option value="lamp-parts">Lamp and Parts</option>
                            <option value="suspension-steering">Suspension and Steering Parts</option>
                            <option value="engine">Engine Parts</option>
                            <option value="electrical">Electrical</option>
                            <option value="wheels-tires">Wheels and Tires</option>
                            <option value="oil-fluids">Oil and Fluids</option>
                            <option value="windscreen-cleaning">Windscreen Cleaning System</option>
                            <option value="clutch">Clutch System</option>
                            <option value="transmission">Transmission</option>
                            <option value="filters">Filters</option>
                            <option value="interiors">Interiors Comfort and Safety</option>
                            <option value="gasket-seals">Gasket and Seals</option>
                            <option value="fuel">Fuel System</option>
                            <option value="exhaust">Exhaust System</option>
                            <option value="cooling">Cooling System</option>
                            <option value="service-kit">Service Kit</option>
                            <option value="accessories">Car Accessories</option>
                            <option value="brake">Brake System</option>
                            <option value="belt-chain">Belt and Chain Drive</option>
                            <option value="fasteners">Fasteners</option>
                            <option value="lighting">Lighting</option>
                            <option value="universal">UNIVERSAL</option>
                        </select>
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-barcode"></i> Part Number *</label>
                        <input type="text" id="editPartNumber" required>
                    </div>
                </div>
                <div class="admin-form-row">
                    <div class="admin-form-group">
                        <label><i class="fas fa-car"></i> Car Brand *</label>
                        <input type="text" id="editCarBrand" required>
                    </div>
                    <div class="admin-form-group">
                        <label><i class="fas fa-tag"></i> Part Brand *</label>
                        <input type="text" id="editPartBrand" required>
                    </div>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-cog"></i> Part Name *</label>
                    <input type="text" id="editPartName" required>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-image"></i> Image</label>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 10px;">
                        <label for="editPartImageFile" style="flex: 1; min-width: 150px; padding: 12px 20px; background: var(--beige-light); border: 2px solid var(--beige-dark); border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <i class="fas fa-folder-open"></i>
                            <span>Choose File</span>
                        </label>
                        <label for="editPartImageCamera" class="camera-button" style="flex: 1; min-width: 150px; padding: 12px 20px; background: var(--orange-light); border: 2px solid var(--orange-medium); border-radius: 8px; cursor: pointer; text-align: center; transition: all 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <i class="fas fa-camera"></i>
                            <span>Open Camera</span>
                        </label>
                    </div>
                    <input type="file" id="editPartImageFile" accept="image/*" onchange="previewEditImage(event)" style="display: none;">
                    <input type="file" id="editPartImageCamera" accept="image/*" capture="environment" onchange="previewEditImageFromCamera(event)" style="display: none;">
                    <div id="editImagePreview" class="admin-image-preview"></div>
                    <small style="display: block; margin-top: 10px;">Or enter image URL: <input type="text" id="editPartImageUrl" placeholder="https://..." style="width: 100%; margin-top: 5px; padding: 8px; border-radius: 5px; border: 1px solid var(--beige-dark);"></small>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-align-left"></i> Description</label>
                    <textarea id="editPartDescription" rows="3"></textarea>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-list"></i> Specifications</label>
                    <textarea id="editPartSpecifications" rows="2"></textarea>
                </div>
                <div class="admin-form-group">
                    <label><i class="fas fa-rupee-sign"></i> Price (₹)</label>
                    <input type="number" id="editPartPrice" placeholder="e.g., 1500" min="0" step="0.01">
                </div>
                <div class="admin-form-actions">
                    <button type="submit" class="admin-btn admin-btn-primary">
                        <i class="fas fa-save"></i> Update Part
                    </button>
                    <button type="button" class="admin-btn admin-btn-secondary" onclick="closeEditPartModal()">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </form>
        </div>
    `;
    
    return modal;
}

// Close edit part modal
function closeEditPartModal() {
    const modal = document.getElementById('editPartModal');
    if (modal) {
        modal.classList.remove('active');
        document.getElementById('editPartForm').reset();
        document.getElementById('editImagePreview').innerHTML = '';
    }
}

// Preview edit image
function previewEditImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('editImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 5px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(file);
        // Clear camera input to avoid conflicts
        const cameraInput = document.getElementById('editPartImageCamera');
        if (cameraInput) {
            cameraInput.value = '';
        }
    }
}

function previewEditImageFromCamera(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('editImagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 5px; margin-top: 10px;">`;
        };
        reader.readAsDataURL(file);
        console.log('📸 Camera image captured for edit:', {
            name: file.name,
            size: file.size,
            type: file.type
        });
    }
}

// Update part via API
async function updatePart(event) {
    event.preventDefault();
    
    const partId = document.getElementById('editPartId').value;
    const formData = new FormData();
    formData.append('category', document.getElementById('editPartCategory').value);
    formData.append('carBrand', document.getElementById('editCarBrand').value);
    formData.append('partBrand', document.getElementById('editPartBrand').value);
    formData.append('partNumber', document.getElementById('editPartNumber').value);
    formData.append('partName', document.getElementById('editPartName').value);
    
    const description = document.getElementById('editPartDescription').value.trim();
    const specifications = document.getElementById('editPartSpecifications').value.trim();
    const imageUrl = document.getElementById('editPartImageUrl').value.trim();
    const price = document.getElementById('editPartPrice').value.trim();
    
    if (description) formData.append('description', description);
    if (specifications) formData.append('specifications', specifications);
    if (imageUrl) formData.append('imageUrl', imageUrl);
    if (price) formData.append('price', price);
    
    // Add image file if uploaded (check both inputs)
    const fileInput = document.getElementById('editPartImageFile');
    const cameraInput = document.getElementById('editPartImageCamera');
    
    let imageFile = null;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        imageFile = fileInput.files[0];
        console.log('📸 Image file from file input for update:', {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type
        });
    } else if (cameraInput && cameraInput.files && cameraInput.files.length > 0) {
        imageFile = cameraInput.files[0];
        console.log('📸 Image file from camera input for update:', {
            name: imageFile.name,
            size: imageFile.size,
            type: imageFile.type
        });
    }
    
    if (imageFile) {
        formData.append('image', imageFile);
        console.log('✅ Image file added to FormData for update');
    } else {
        console.log('⚠️ No new image file selected for update');
    }
    
    try {
        console.log('📤 Sending update request to server...');
        const response = await fetch(`${API_BASE_URL}/parts/${partId}`, {
            method: 'PUT',
            body: formData
        });
        
        const result = await response.json();
        
        if (response.ok) {
            if (result.data && result.data.image) {
                console.log('✅ Image URL updated:', result.data.image);
                alert('Part updated successfully with image!');
            } else {
                if (imageFile) {
                    console.warn('⚠️ Part updated but no image URL in response');
                    alert('Part updated, but image may not have uploaded. Check server console for errors.');
                } else {
                    alert('Part updated successfully!');
                }
            }
            closeEditPartModal();
            // Reload parts data and refresh display
            if (typeof window.loadCategoryParts === 'function' && typeof window.loadPartsData === 'function') {
                const urlParams = new URLSearchParams(window.location.search);
                const category = urlParams.get('category');
                if (category) {
                    setTimeout(async () => {
                        try {
                            await window.loadPartsData();
                            await window.loadCategoryParts(category);
                            console.log('Parts reloaded successfully');
                        } catch (error) {
                            console.error('Error reloading parts:', error);
                            window.location.reload(true);
                        }
                    }, 500);
                } else {
                    window.location.reload(true);
                }
            } else {
                window.location.reload(true);
            }
        } else {
            alert(`Error: ${result.message || 'Failed to update part'}`);
        }
    } catch (error) {
        console.error('Error updating part:', error);
        alert('Error connecting to server. Please try again.');
    }
}

// Delete part via API
async function deletePart(partId, partName) {
    if (!confirm(`Are you sure you want to delete "${partName}"?`)) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/parts/${partId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert('Part deleted successfully!');
            // Reload parts data and refresh display
            if (typeof window.loadCategoryParts === 'function' && typeof window.loadPartsData === 'function') {
                const urlParams = new URLSearchParams(window.location.search);
                const category = urlParams.get('category');
                if (category) {
                    setTimeout(async () => {
                        try {
                            await window.loadPartsData();
                            await window.loadCategoryParts(category);
                            console.log('Parts reloaded successfully');
                        } catch (error) {
                            console.error('Error reloading parts:', error);
                            window.location.reload(true);
                        }
                    }, 500);
                } else {
                    window.location.reload(true);
                }
            } else {
                window.location.reload(true);
            }
        } else {
            alert(`Error: ${result.message || 'Failed to delete part'}`);
        }
    } catch (error) {
        console.error('Error deleting part:', error);
        alert('Error connecting to server. Please try again.');
    }
}

// Initialize admin features when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (isAdmin()) {
            showAdminControls();
        }
    });
} else {
    if (isAdmin()) {
        showAdminControls();
    }
}

