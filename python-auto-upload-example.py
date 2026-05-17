import boto3
from pathlib import Path

ACCOUNT_ID = "YOUR_CLOUDFLARE_ACCOUNT_ID"
ACCESS_KEY = "YOUR_R2_ACCESS_KEY"
SECRET_KEY = "YOUR_R2_SECRET_KEY"
BUCKET = "dax-ai-results"
PUBLIC_URL = "https://charts.chartataglance.co.uk"

s3 = boto3.client(
    service_name="s3",
    endpoint_url=f"https://{ACCOUNT_ID}.r2.cloudflarestorage.com",
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
)

def upload_to_r2(local_file, pattern_name):
    local_file = Path(local_file)
    remote_name = f"{pattern_name}/{local_file.name}"

    s3.upload_file(
        str(local_file),
        BUCKET,
        remote_name,
        ExtraArgs={"ContentType": "image/png"}
    )

    return f"{PUBLIC_URL}/{remote_name}"

# In live_detect.py, after cv2.imwrite(str(filename), annotated):
# r2_url = upload_to_r2(filename, class_name)
# print(f"UPLOADED: {r2_url}")
# Path(filename).unlink()  # optional cleanup
