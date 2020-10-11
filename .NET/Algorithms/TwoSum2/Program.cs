using System;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;

namespace TwoSum2
{
    class Program
    {
        /*
         * Input is sorted ascendingly 
         */

        static void Main(string[] args)
        {
            int[] valuePts = TwoSumPointers(new int[] { 2, 7, 11, 15 }, 9);
            Console.WriteLine($"Pointers: {valuePts[0]}, {valuePts[1]}");

            int[] valueRcrs = TwoSumPointers(new int[] { 2, 7, 11, 15 }, 9);
            Console.WriteLine($"Recursion: {valueRcrs[0]}, {valueRcrs[1]}");
        }

        public static int[] TwoSumPointers(int[] input, int target)
        {
            int[] res = new int[2];

            int pt1 = 0;
            int pt2 = input.Length - 1;

            for (int i = 0; i < input.Length; i++)
            {
                int sum = input[pt1] + input[pt2];

                if (sum > target)
                    pt2--;
                else if (sum < target)
                    pt1++;
                else
                    break;
            }

            res[0] = pt1+1;
            res[1] = pt2+1;
            return res;
        }
        public static int[] TwoSumRecursive(int[] input, int target)
        {
            int[] res = new int[2];

            for (int i = 0; i < input.Length; i++)
            {
                int curNumber = input[i];
                for (int y = 0; y < i; y++)
                {
                    if (curNumber + input[y] == target)
                    {
                        res[0] = y+1;
                        res[1] = i+1;
                        break;
                    }
                }
            }

            return res;
        }
    }
}
