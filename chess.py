import cv2 as cv
import numpy as np

# 1. تغيير النوع إلى uint8
img = np.zeros((1000, 1000, 3), dtype=np.uint8)

square_size = 125

for i in range(8): # الرقعة 8x8
    for x in range(8):
        # 2. منطق اللون الصحيح: تبادل الألوان في الصفوف والأعمدة
        if (i + x) % 2 == 0:
            color = (255, 255, 255) # أبيض
        else:
            color = (0, 0, 0) # أسود
            
        # 3. حساب زوايا المربع الحالي مباشرة دون الحاجة لـ last_point
        top_left = (x * square_size, i * square_size)
        bottom_right = ((x + 1) * square_size, (i + 1) * square_size)
        
        # رسم المربع كمساحة مملوءة (-1)
        cv.rectangle(img, top_left, bottom_right, color, -1)


cv.imwrite('chess_board.png', img)

m_img = np.zeros((1000,1000,3),dtype=np.int32)

cv.putText(m_img, 'Mo Sa', (10, 500), cv.FONT_HERSHEY_SIMPLEX, 8, (255,215,0), 50)
cv.imwrite("mosa.png",m_img)

canvas = np.zeros((512, 1024, 4), dtype=np.uint8)

# Define the "unrolled" crown shape
# Draw a series of triangles (the peaks)
points = np.array([[0, 250], [128, 50], [256, 250], [384, 50], [512, 250], 
                  [640, 50], [768, 250], [896, 50], [1024, 250], 
                  [1024, 512], [0, 512]], np.int32)

cv.fillPoly(canvas, [points], (255, 215, 0, 255)) # Golden color with full Alpha
cv.imwrite('crown_texture.png', canvas)

def skills_box():
    # Face configurations: (Text, Second Line/List)
    faces = [
        ("MERN", ["Stack"]),
        ("React.js", []),
        ("React Native", []),
        ("THREE.js", []),
        ("Python", []),
        ("ERPNext", ["NumPy", "Scapy", "Socket"])
    ]

    for i, (main_text, sub_texts) in enumerate(faces):
        # 1. Create a 100x100 gradient background (Black to Gray)
        # We create a 1D gradient and broadcast it across the width
        gradient_line = np.linspace(0, 100, 100, dtype=np.uint8)
        # Reshape to (100, 1) and repeat to (100, 100, 3)
        face = np.zeros((100, 100, 3), dtype=np.uint8)
        for c in range(3): # Apply to B, G, R channels
            face[:, :, c] = np.tile(gradient_line[:, np.newaxis], (1, 100))

        # 2. Text Settings
        font = cv.FONT_HERSHEY_SIMPLEX
        font_scale = 0.35
        color = (255, 255, 255) # White text
        thickness = 1
        
        # 3. Draw Main Text
        # Calculate position to center roughly
        text_size = cv.getTextSize(main_text, font, font_scale, thickness)[0]
        text_x = (100 - text_size[0]) // 2
        text_y = 40 if sub_texts else 55 # Shift up if there is a sub-text
        
        cv.putText(face, main_text, (text_x, text_y), font, font_scale, color, thickness, cv.LINE_AA)

        # 4. Draw Sub-texts (Stack or the list for face 6)
        y_offset = text_y + 15
        for sub in sub_texts:
            sub_size = cv.getTextSize(sub, font, font_scale - 0.05, thickness)[0]
            sub_x = (100 - sub_size[0]) // 2
            cv.putText(face, sub, (sub_x, y_offset), font, font_scale - 0.05, color, thickness, cv.LINE_AA)
            y_offset += 12 # Move down for next item

        # 5. Save the face
        cv.imwrite(f"face_{i+1}.png", face)
        print(f"Saved face_{i+1}.png")

skills_box()

def create_ninja_texture(output_path='ninja_texture_body.png'):
    # 1. Setup Canvas (Width should be 2x Height for cylindrical wrapping)
    # Width = Circumference of pawn, Height = Height of pawn body
    width, height = 1024, 512
    # Base color: Ninja Black/Dark Gray (RGBA for transparency support)
    img = np.full((height, width, 4), (30, 30, 30, 255), dtype=np.uint8)

    # 2. Draw the Gi / Suit Opening (Front Center)
    # The center of the image (512) is the front of the pawn
    center_x = width // 2
    
    # Neck V-Shape (Skin or under-layer showing)
    # Using a slightly lighter gray for the suit folds
    pts_neck = np.array([[center_x - 100, 0], [center_x + 100, 0], [center_x, 150]], np.int32)
    cv.fillPoly(img, [pts_neck], (15, 15, 15, 255)) 
    
    # Draw the Lapels (the crossing lines of the robe)
    cv.line(img, (center_x - 100, 0), (center_x + 50, 300), (50, 50, 50, 255), 8)
    cv.line(img, (center_x + 100, 0), (center_x - 50, 300), (40, 40, 40, 255), 8)

    # 3. Draw the Ninja Belt (Obi)
    # A red or black belt around the waist (lower middle)
    belt_y = int(height * 0.6)
    belt_thickness = 40
    # Red Belt
    cv.rectangle(img, (0, belt_y), (width, belt_y + belt_thickness), (40, 40, 180, 255), -1)
    
    # Belt Knot (Only in the front center)
    cv.rectangle(img, (center_x - 30, belt_y - 10), (center_x + 30, belt_y + belt_thickness + 10), (30, 30, 150, 255), -1)

    # 4. Add Fabric Texture/Noise (Optional - makes it look less like plastic)
    noise = np.zeros((height, width, 4), dtype=np.uint8)
    cv.randn(noise, (0, 0, 0, 0), (5, 5, 5, 0))
    img = cv.add(img, noise)

    # 5. Save the result
    cv.imwrite(output_path, img)
    print(f"Ninja texture saved to {output_path}")

create_ninja_texture()