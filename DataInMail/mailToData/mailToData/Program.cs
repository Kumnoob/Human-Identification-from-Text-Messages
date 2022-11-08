using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace mailToData // Note: actual namespace depends on the project name.
{
    public class Program
    {
        static void Main(string[] args)
        {
            
            var srcDirectory = "C:\\Users\\PAT\\OneDrive\\เดสก์ท็อป\\maildir";
            Console.WriteLine("src directory :", srcDirectory);

            var dstDirectory = "C:\\Users\\PAT\\OneDrive\\เดสก์ท็อป\\mailToData";
            Console.WriteLine("dst directory", dstDirectory);


            if (!Directory.Exists(dstDirectory))
            {
                Directory.CreateDirectory(dstDirectory);
            }

            var bigDirectories = Directory.GetDirectories(srcDirectory);

            foreach (var bigDirectory in bigDirectories)
            {
                var bigDirFolderName = bigDirectory.Split(srcDirectory+ "\\")[1];
                var bigSrcDir = Path.Combine(srcDirectory, bigDirFolderName);
                var bigDstDir = Path.Combine(dstDirectory, bigDirFolderName);

                var smallDirectories = Directory.GetDirectories(bigSrcDir);

                if (!Directory.Exists(bigDstDir))
                {
                    Directory.CreateDirectory(bigDstDir);
                }

                foreach (var smallDirectory in smallDirectories)
                {
                    var smallDirFolderName = smallDirectory.Split(bigDirFolderName + "\\")[1];
                    var smallSrcDir = Path.Combine(bigSrcDir, smallDirFolderName);
                    var smallDstDir = Path.Combine(bigDstDir, smallDirFolderName);

                    if (!Directory.Exists(smallDstDir))
                    {
                        Directory.CreateDirectory(smallDstDir);
                    }
                    string[] fileEntries = Directory.GetFiles(smallSrcDir);

                    foreach (string file in fileEntries)
                    {
                        var fileName = file.Split(smallDirFolderName + "\\")[1];
                        var fileDst = Path.Combine(smallDstDir, fileName);
                        var texts = File.ReadLines(file);
                        if (!File.Exists(fileDst))
                        {
                            File.Create(fileDst);
                        }
                        var listTextFile = new List<TextFile>();
                        bool letToWrite = false;

                        foreach(var text in texts)
                        {
                            var textFile = new TextFile();
                            if(text == String.Empty || text == "" && !letToWrite)
                            {
                                letToWrite = true;
                            }
                            else if(letToWrite)
                            {
                                textFile.text = text;
                                listTextFile.Add(textFile);
                            }
                        }
                        try
                        {
                            using (var sw = File.CreateText(fileDst))
                            {
                                foreach (var textFile in listTextFile)
                                {
                                    sw.WriteLine(textFile.text);
                                }
                            }
                        }
                        catch
                        {
                            //System.Threading.Thread.Sleep(1);
                        }
                        
                    }
                }
            }
        }
    }
    public class TextFile
    {
        public string text = String.Empty;
    }
}