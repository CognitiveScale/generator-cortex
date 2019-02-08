param([string]$srcFolder = "",[string]$dstFile = "")

if( $srcFolder -eq "" )
{
    echo "No source folder provided."
    exit
}

if( $dstFile -eq "" )
{
    echo "No destination file provided."
    exit
}

Add-Type -AssemblyName System.Text.Encoding
Add-Type -AssemblyName System.IO.Compression.FileSystem

class FixedEncoder : System.Text.UTF8Encoding {
    FixedEncoder() : base($true) { }

    [byte[]] GetBytes([string] $s)
    {
        $s = $s.Replace("\", "/");
        return ([System.Text.UTF8Encoding]$this).GetBytes($s);
    }
}

echo "Building zip $dstFile"

[System.IO.Compression.ZipFile]::CreateFromDirectory($srcFolder, $dstFile, [System.IO.Compression.CompressionLevel]::Optimal, $false, [FixedEncoder]::new())

