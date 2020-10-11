using System;

namespace _6._Palindrome_Linked_List
{
    partial class Program
    {
        static void Main(string[] args)
        {
            SinglyLinkedList<int> list = new SinglyLinkedList<int>();
            list.AddLast(1);
            list.AddLast(2);
            list.AddLast(5);
            list.AddLast(1);


            Console.WriteLine("Input:");
            list.PrintList();

            Console.WriteLine("\n" + IsPalindrome(list.Nodes[0]));
        }

        /*
         * Pointers to get half of it all
         */
        public static bool IsPalindrome<T>(SinglyLinkedList<T>.SinglyLinkedNode head)
        {
            var slowPointer = head;
            var fastPointer = head;

            while (fastPointer != null && fastPointer.Next != null){
                slowPointer = slowPointer.Next;
                fastPointer = fastPointer.Next.Next;
            }

            Console.WriteLine("Slow List:");
            SinglyLinkedList<T>.PrintList(slowPointer);
            var slowRev = SinglyLinkedList<T>.ReverseList(slowPointer);
            Console.WriteLine("Slow Reversed List:");
            SinglyLinkedList<T>.PrintList(slowRev);

            fastPointer = head;

            while(slowRev != null)
            {
                if (!slowRev.Data.Equals(fastPointer.Data))
                    return false;

                slowRev = slowRev.Next;
                fastPointer = fastPointer.Next;
            }

            return true;
        }
    }
}
