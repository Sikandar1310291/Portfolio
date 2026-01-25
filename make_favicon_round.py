from PIL import Image, ImageOps

def make_circle(image_path, output_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        
        # Create a circular mask
        mask = Image.new("L", img.size, 0)
        import ImageDraw
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0) + img.size, fill=255)
        
        # Apply the mask
        output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
        output.putalpha(mask)
        
        output.save(output_path)
        print(f"Successfully created {output_path}")
    except Exception as e:
        print(f"Error: {e}")
        # If ImageDraw import fails (some old PIL versions), try direct approach
        try:
             from PIL import ImageDraw
             mask = Image.new("L", img.size, 0)
             draw = ImageDraw.Draw(mask)
             draw.ellipse((0, 0) + img.size, fill=255)
             output = ImageOps.fit(img, mask.size, centering=(0.5, 0.5))
             output.putalpha(mask)
             output.save(output_path)
             print(f"Successfully created {output_path} (attempt 2)")
        except Exception as e2:
             print(f"Error 2: {e2}")

if __name__ == "__main__":
    make_circle("assets/images/avatar-cartoon.jpg", "assets/images/favicon.png")
