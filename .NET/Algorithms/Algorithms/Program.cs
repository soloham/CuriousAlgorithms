using System;
using System.Collections.Generic;

namespace Algorithms.PascalTree
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.Write("Enter the number of rows: ");
                int.TryParse(Console.ReadLine(), out int numRows);
                var s = DateTime.Now;
                var triangle = GeneratePascalTriangle(numRows);
                var e = DateTime.Now;

                Console.WriteLine("=> Performance: " + (e - s).TotalMilliseconds + "ms\n");
                Console.WriteLine("Would you like to print out the triangle? (y|n)");
                if (Console.ReadKey().KeyChar.ToString().ToLower() == "y")
                {
                    for (int i = 0; i < triangle.Length; i++)
                    {
                        for (int j = 0; j < triangle[i].Length; j++)
                        {
                            Console.Write(triangle[i][j] + (j < triangle[i].Length - 1 ? "," : ""));
                        }
                        Console.WriteLine("");
                    }
                }
                Console.WriteLine();
            }
        }

        public static int[][] GeneratePascalTriangle(int numRows)
        {
            if (numRows == 0) return new int[0][];

            List<int[]> triangle = new List<int[]>() { new int[] { 1 } };

            for (int i = 2; i < numRows+1; i++)
            {
                int[] row = new int[i];
                row[0] = 1;
                row[i-1] = 1;

                int[] lastRow = triangle[i - 2];

                for (int j = 1; j < i - 1; j++)
                {
                    int node = lastRow[j - 1] + lastRow[j];
                    row[j] = node;
                }

                triangle.Add(row);
            }

            return triangle.ToArray();
        }
    }
}
